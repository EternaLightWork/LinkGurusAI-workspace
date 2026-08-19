# Deployment notes

Record verified facts here. Do not pre-fill from documentation — spec 10.5
requires the *actual* account values.

## Hosting

- [ ] Hostinger plan name and version, as shown in hPanel:
- [ ] Node.js version available:
- [ ] Verified outbound email limit (messages/minute, messages/day):
- [ ] Private template directory path (`PRIVATE_TEMPLATE_DIR`), confirmed to be
      outside the public web root:
- [ ] Cron schedule configured for the email worker:

## Database

- [ ] MySQL version:
- [ ] Connection limit available to the app:
- [ ] Backup schedule and verified restore test date:

## Email

- [ ] SMTP provider:
- [ ] Sender name / address / reply-to (approved by Kholoud):
- [ ] Bounce and complaint handling:
- [ ] Internal lead recipient:

## Pre-launch gates still open

These block public launch (spec 9.3) and are tracked in the build, not here:

- Legal review of Privacy and Terms.
- Accessibility QA against WCAG 2.2 AA, including RTL and the email→download path.
- Security review of tokens, rate limiting, logging, SMTP and private storage.
- Verified founder biography and the employers that may be named.
- Corrected English "Decision in View" PDF title and metadata.
- Decision on whether the Decision-to-Hold Map is public or internal.
