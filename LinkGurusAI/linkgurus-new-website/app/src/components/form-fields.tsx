"use client";

import type { ReactNode } from "react";

/**
 * Shared field chrome. Every control gets a persistent visible label, a
 * programmatic error association and a 44px minimum target (spec 3.5).
 */
export function Field({
  id,
  label,
  error,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: (props: {
    id: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    required: boolean | undefined;
    className: string;
  }) => ReactNode;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ");

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-neutral-950">
        {label}
        {required && (
          <span className="text-blue-600" aria-hidden="true">
            {" *"}
          </span>
        )}
      </label>
      {hint && (
        <p id={hintId} className="mb-1.5 text-sm text-neutral-600">
          {hint}
        </p>
      )}
      {children({
        id,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy || undefined,
        required: required || undefined,
        className: `min-h-11 w-full rounded-xs border bg-neutral-0 px-3 py-2.5 text-base text-neutral-950 placeholder:text-neutral-500 ${
          error ? "border-red-600" : "border-neutral-300 focus:border-blue-600"
        }`,
      })}
      {error && (
        <p id={errorId} className="mt-1.5 border-s-2 border-red-600 ps-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function Checkbox({
  id,
  label,
  name,
  error,
  required,
  defaultChecked,
}: {
  id: string;
  label: ReactNode;
  name: string;
  error?: string;
  required?: boolean;
  defaultChecked?: boolean;
}) {
  const errorId = `${id}-error`;
  return (
    <div>
      <div className="flex min-h-11 items-start gap-3">
        <input
          type="checkbox"
          id={id}
          name={name}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-blue-500)]"
        />
        <label htmlFor={id} className="text-base text-neutral-950">
          {label}
          {required && (
            <span className="text-blue-600" aria-hidden="true">
              {" *"}
            </span>
          )}
        </label>
      </div>
      {error && (
        <p id={errorId} className="mt-1 border-s-2 border-red-600 ps-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

/** Spec 3.5: errors appear beside the field *and* in an announced summary. */
export function ErrorSummary({
  title,
  errors,
  headingId,
}: {
  title: string;
  errors: { field: string; message: string }[];
  headingId: string;
}) {
  if (errors.length === 0) return null;
  return (
    <div
      role="alert"
      tabIndex={-1}
      id={headingId}
      className="border-s-2 border-red-600 bg-red-50 p-4"
    >
      <p className="font-semibold text-red-700">{title}</p>
      <ul className="mt-2 space-y-1">
        {errors.map((error) => (
          <li key={error.field}>
            <a href={`#${error.field}`} className="text-red-700 underline underline-offset-4">
              {error.message}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Off-screen honeypot. Hidden from assistive technology and from tab order. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label htmlFor="company_website">Company website</label>
      <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
