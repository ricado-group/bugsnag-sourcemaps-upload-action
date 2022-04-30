# Bugsnag Source Maps Upload Action
A Simple Action that uses `@bugsnag/source-maps` to upload sourcemaps from a Local Directory to Bugsnag

## Inputs

### `api-key`

**Required** A Bugsnag API Key

### `directory`

**Required** Path to the Directory containing Source Map Files (e.g. ./sourcemaps)

### `base-url`

**Required** Base URL that JS Bundles are served from (can contain * wildcards - e.g. https://*.mydomain.com/js)

### `app-version`

**Required** The Version of the Application these Source Maps belong to (this should match the `appVersion` configured in your Notifier)

### `overwrite`

_Optional_ Whether to replace Source Maps uploaded with the same Version

Defaults to `false`

### `endpoint`

_Optional_ Customize the Upload Endpoint for Bugsnag On-Premise

## Example Usage

```yml
uses: ricado-group/bugsnag-sourcemaps-upload-action@v1
with:
  api-key: ${{ secrets.BUGSNAG_APIKEY }}
  directory: ./sourcemaps
  base-url: 'https://*.mydomain.com/js'
  app-version: '1.0.0'
  overwrite: true
```

## Stay Updated with Dependabot

Use [Dependabot](https://docs.github.com/en/github/administering-a-repository/keeping-your-actions-up-to-date-with-github-dependabot) to update your GitHub Actions by creating a `.github/dependabot.yml` file:

```yaml
version: 2
updates:
  # Maintain Dependencies for GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "daily"
```