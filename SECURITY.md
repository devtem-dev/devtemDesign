# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

Only the latest 0.1.x releases receive security updates.

## Reporting a Vulnerability

If you discover a security vulnerability in **devtemDesign**, please report it privately.

**Do not** open a public GitHub issue for security-related reports.

### How to report

1. Email the maintainers at the address listed in the repository (or use GitHub’s private vulnerability reporting feature if enabled).
2. Include:
   - A clear description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Any suggested fix (optional)

We will acknowledge receipt within a few days and keep you informed of the progress.

### What to expect

- We will investigate and confirm the issue.
- If accepted, we will work on a fix and coordinate a release.
- Credit will be given to the reporter unless you prefer to remain anonymous.
- We aim to resolve critical issues as quickly as possible.

## Scope

devtemDesign is a client-side JavaScript + CSS library with no server component and no external runtime dependencies.

Out of scope (in most cases):

- Vulnerabilities that only appear when the library is used with untrusted / unsanitized user-generated HTML (the engine inserts config strings as HTML — callers must sanitize if the content is untrusted).
- Issues in third-party fonts, icons (e.g. Font Awesome), or CDNs.
- Browser bugs unrelated to the library.

## Best practices for consumers

- Never pass untrusted HTML into text fields of the config (`heroTitleLine1`, feature descriptions, FAQ answers, etc.) without sanitization.
- Keep the library updated to the latest 0.1.x release.
- If you host the files yourself, serve them over HTTPS.

Thank you for helping keep devtemDesign and its users safe.
