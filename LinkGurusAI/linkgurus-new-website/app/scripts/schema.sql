-- Linkgurus data model. Spec 8.3.
-- utf8mb4 throughout: Arabic content, including tashkil, must round-trip.

CREATE TABLE IF NOT EXISTS templates (
  id            VARCHAR(64)  NOT NULL PRIMARY KEY,
  slug          VARCHAR(96)  NOT NULL UNIQUE,
  practice      VARCHAR(48)  NOT NULL,
  tier          VARCHAR(16)  NOT NULL,
  status        VARCHAR(24)  NOT NULL,
  version       VARCHAR(32)  NOT NULL,
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- storage_key is an internal registry key, never a user-supplied path (spec 7.2).
CREATE TABLE IF NOT EXISTS template_files (
  id            INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  template_id   VARCHAR(64)  NOT NULL,
  locale        CHAR(2)      NOT NULL,
  storage_key   VARCHAR(160) NOT NULL,
  download_name VARCHAR(160) NOT NULL,
  mime_type     VARCHAR(64)  NOT NULL DEFAULT 'application/pdf',
  byte_size     INT UNSIGNED NOT NULL,
  checksum      CHAR(64)     NOT NULL,
  status        VARCHAR(24)  NOT NULL DEFAULT 'available',
  created_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_template_locale (template_id, locale),
  CONSTRAINT fk_files_template FOREIGN KEY (template_id) REFERENCES templates(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS contacts (
  id               INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email_normalized VARCHAR(255) NOT NULL UNIQUE,
  email_original   VARCHAR(255) NOT NULL,
  first_name       VARCHAR(120) NULL,
  organization     VARCHAR(180) NULL,
  role             VARCHAR(120) NULL,
  created_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at       DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS template_requests (
  id                  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  contact_id          INT UNSIGNED NOT NULL,
  template_file_id    INT UNSIGNED NOT NULL,
  source_context_json JSON         NULL,
  privacy_version     VARCHAR(32)  NOT NULL,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_requests_contact (contact_id),
  CONSTRAINT fk_requests_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE,
  CONSTRAINT fk_requests_file FOREIGN KEY (template_file_id) REFERENCES template_files(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Only the keyed hash is stored. A leaked database row cannot mint a download.
CREATE TABLE IF NOT EXISTS download_tokens (
  id          INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  request_id  INT UNSIGNED NOT NULL,
  token_hash  CHAR(64)     NOT NULL UNIQUE,
  expires_at  DATETIME     NOT NULL,
  used_at     DATETIME     NULL,
  created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_tokens_expiry (expires_at),
  CONSTRAINT fk_tokens_request FOREIGN KEY (request_id) REFERENCES template_requests(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Append-only. Consent history is never rewritten in place.
CREATE TABLE IF NOT EXISTS consent_events (
  id             INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  contact_id     INT UNSIGNED NOT NULL,
  purpose        VARCHAR(48)  NOT NULL,
  action         VARCHAR(24)  NOT NULL,
  policy_version VARCHAR(32)  NOT NULL,
  locale         CHAR(2)      NOT NULL,
  created_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_consent_contact (contact_id),
  CONSTRAINT fk_consent_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS subscriptions (
  contact_id      INT UNSIGNED NOT NULL PRIMARY KEY,
  status          VARCHAR(24)  NOT NULL DEFAULT 'pending',
  locale          CHAR(2)      NOT NULL,
  topics_json     JSON         NULL,
  confirm_hash    CHAR(64)     NULL,
  confirm_expires DATETIME     NULL,
  manage_hash     CHAR(64)     NULL,
  confirmed_at    DATETIME     NULL,
  unsubscribed_at DATETIME     NULL,
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_confirm_hash (confirm_hash),
  UNIQUE KEY uq_manage_hash (manage_hash),
  CONSTRAINT fk_subs_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- payload_json holds ids and locale only, never message bodies or tokens.
CREATE TABLE IF NOT EXISTS email_jobs (
  id              INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  type            VARCHAR(48)  NOT NULL,
  contact_id      INT UNSIGNED NULL,
  locale          CHAR(2)      NOT NULL,
  payload_json    JSON         NOT NULL,
  status          VARCHAR(24)  NOT NULL DEFAULT 'pending',
  attempts        TINYINT UNSIGNED NOT NULL DEFAULT 0,
  next_attempt_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  locked_at       DATETIME     NULL,
  -- Set by the worker when it claims a batch, so two concurrent runs can
  -- never pick up the same rows.
  claim_id        VARCHAR(32)  NULL,
  last_error      VARCHAR(255) NULL,
  created_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  KEY ix_jobs_claim (status, next_attempt_at),
  KEY ix_jobs_claim_id (claim_id),
  CONSTRAINT fk_jobs_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Delivery audit without the message body (spec 8.3).
CREATE TABLE IF NOT EXISTS email_deliveries (
  id                  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  job_id              INT UNSIGNED NOT NULL,
  provider_message_id VARCHAR(255) NULL,
  status              VARCHAR(24)  NOT NULL,
  error_code          VARCHAR(64)  NULL,
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_deliveries_job (job_id),
  CONSTRAINT fk_deliveries_job FOREIGN KEY (job_id) REFERENCES email_jobs(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS enquiries (
  id                  INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  contact_id          INT UNSIGNED NOT NULL,
  country             VARCHAR(80)  NOT NULL,
  trigger_id          VARCHAR(80)  NULL,
  practice_id         VARCHAR(48)  NULL,
  offer_id            VARCHAR(48)  NULL,
  decision_date       VARCHAR(120) NULL,
  context_note        TEXT         NULL,
  preferred_language  CHAR(2)      NOT NULL,
  phone               VARCHAR(48)  NULL,
  referral_source     VARCHAR(160) NULL,
  source_context_json JSON         NULL,
  status              VARCHAR(24)  NOT NULL DEFAULT 'new',
  created_at          DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_enquiries_contact (contact_id),
  CONSTRAINT fk_enquiries_contact FOREIGN KEY (contact_id) REFERENCES contacts(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Salted-hash buckets. No raw IP address is ever written.
CREATE TABLE IF NOT EXISTS rate_limit_events (
  id         INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  bucket     VARCHAR(48)  NOT NULL,
  key_hash   CHAR(64)     NOT NULL,
  created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY ix_rate_lookup (bucket, key_hash, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
