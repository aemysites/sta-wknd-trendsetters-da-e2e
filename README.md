# WKND Trendsetters DA E2E

This is an end-to-end testing repository for the daily migration of the WKND Trendsetters site to Edge Delivery Services using Document Authoring (DA) as the content source.

## Purpose

This repository automates the daily migration and testing of the WKND Trendsetters site from Document Authoring to Edge Delivery Services, ensuring content integrity and functionality throughout the migration process.

## Environments

- Preview: https://main--sta-wknd-trendsetters-da-e2e--aemysites.aem.page/
- Live: https://main--sta-wknd-trendsetters-da-e2e--aemysites.aem.live/
- Block Library: https://main--sta-wknd-trendsetters-da-e2e--aemysites.aem.page/tools/sidekick/library.html?plugin=blocks

## Source Content

- **Content Source**: Document Authoring (DA)
- **Origin**: https://content.da.live/aemysites/sta-wknd-trendsetters-da-e2e/
- **Type**: Markup-based content authoring

## Daily E2E Testing

This repository is configured for automated daily end-to-end testing:

1. **Daily Reset**: Every day at 4:45 AM UTC, the `backup-and-reset-e2e.yaml` workflow:
   - Creates a backup branch of the current state
   - Resets the main branch to a known good state (E2E_WORKFLOW_COMMIT)
   - Creates an AEMY Installation issue to trigger migration

2. **Migration Process**: Experience Catalyst triggers the DA upload workflow:
   - Downloads and extracts content from DA source
   - Transforms content using the importer tools
   - Uploads to Edge Delivery Services
   - Previews and publishes the migrated content

3. **Status Reporting**: Throughout the process, status updates are sent to AEMY and Slack

## Content Source Differences

Unlike SharePoint-based migrations, this DA repository handles:

- **Markup-based authoring** instead of Office documents
- **Google Drive or DA storage** instead of SharePoint
- **Real-time content updates** from Universal Editor
- **Different block transformation** rules optimized for DA content

## Documentation

Before using this repository, we recommend going through the documentation on [www.aem.live](https://www.aem.live/docs/) and [experienceleague.adobe.com](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/authoring):

1. [Getting Started](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/edge-dev-getting-started)
2. [Creating Blocks](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/create-block)
3. [Content Modelling](https://experienceleague.adobe.com/en/docs/experience-manager-cloud-service/content/edge-delivery/wysiwyg-authoring/content-modeling)
4. [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)

## Prerequisites

- nodejs 18.3.x or newer
- AEM Cloud Service release 2024.8 or newer (>= `17465`)

## Installation

```sh
npm i
```

## Linting

```sh
npm run lint
```

## Local development

1. The repository is already configured with the DA mountpoint in `fstab.yaml`
1. The [AEM Code Sync GitHub App](https://github.com/apps/aem-code-sync) should be added to the repository
1. Install the [AEM CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/aem-cli`
1. Start AEM Proxy: `aem up` (opens your browser at `http://localhost:3000`)
1. Open the `sta-wknd-trendsetters-da-e2e` directory in your favorite IDE and start coding :)

## Required Repository Configuration

To enable the daily e2e workflows, you need to configure the following repository settings:

### Repository Variables (Settings → Secrets and variables → Actions → Variables)

| Variable | Description | Example |
|----------|-------------|---------|
| `E2E_WORKFLOW_COMMIT` | The commit hash to reset to during daily backup/reset | `abc123def456...` |

### Repository Secrets (Settings → Secrets and variables → Actions → Secrets)

| Secret | Description | Required For |
|--------|-------------|--------------|
| `WORKFLOW_PAT` | Personal Access Token with repo permissions | Backup/reset workflows |
| `SLACK_BOT_TOKEN` | Slack Bot Token for posting notifications | All Slack notifications |
| `SLACK_CHANNEL_ID` | Slack Channel ID where notifications are sent | All Slack notifications |
| `DA_CLIENT_ID` | DA client ID | DA content upload |
| `DA_CLIENT_SECRET` | DA client secret | DA content upload |
| `DA_SERVICE_TOKEN` | DA service token | DA content upload |
| `AEMY_API_KEY` | AEMY API key for status callbacks | Status reporting |

## E2E Testing Validation

The daily e2e tests validate:

- Content migration accuracy from DA to Edge Delivery
- Block functionality and rendering
- Performance metrics
- Cross-browser compatibility
- Mobile responsiveness
- Content authoring workflow integration