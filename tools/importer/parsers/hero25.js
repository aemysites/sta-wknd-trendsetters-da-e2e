/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link for iframe src
  function createLinkFromIframe(iframe) {
    const a = document.createElement('a');
    a.href = iframe.src;
    a.textContent = iframe.title || iframe.src;
    return a;
  }

  // --- 1. HEADER ROW ---
  const headerRow = ['Hero (hero25)'];

  // --- 2. BACKGROUND IMAGE/ASSET ROW ---
  // In this case, the visual asset is a YouTube video (iframe) with a placeholder image
  // Find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  let backgroundCell = '';
  if (grid) {
    // Find the video container
    const videoWrap = grid.querySelector('.utility-position-relative');
    if (videoWrap) {
      // Find the embed container
      const embed = videoWrap.querySelector('.w-embed-youtubevideo');
      if (embed) {
        // Try to use the img as the background asset if present
        const img = embed.querySelector('img');
        if (img) {
          backgroundCell = img;
        }
        // If there's an iframe, include a link to the video as required
        const iframe = embed.querySelector('iframe');
        if (iframe) {
          // If there's already an image, add the link below it
          if (backgroundCell) {
            backgroundCell = [backgroundCell, document.createElement('br'), createLinkFromIframe(iframe)];
          } else {
            backgroundCell = createLinkFromIframe(iframe);
          }
        }
      }
    }
  }

  // --- 3. CONTENT ROW (Title, Subheading, CTA) ---
  let contentCell = document.createElement('div');
  if (grid) {
    // Title: find the .h1-heading
    const title = grid.querySelector('.h1-heading');
    if (title) {
      const h1 = document.createElement('h1');
      h1.textContent = title.textContent;
      contentCell.appendChild(h1);
    }
    // Subheading: find the .subheading
    const subheadingWrap = grid.querySelector('.utility-padding-top-2rem');
    if (subheadingWrap) {
      const subheading = subheadingWrap.querySelector('p');
      if (subheading) {
        const p = document.createElement('p');
        p.textContent = subheading.textContent;
        contentCell.appendChild(p);
      }
    }
    // CTA: find the .button-group
    const buttonGroup = grid.querySelector('.button-group');
    if (buttonGroup) {
      // Clone all buttons/links
      buttonGroup.querySelectorAll('a').forEach((btn) => {
        contentCell.appendChild(btn);
        contentCell.appendChild(document.createTextNode(' '));
      });
    }
  }

  // Remove trailing whitespace in contentCell
  contentCell.innerHTML = contentCell.innerHTML.trim();

  // --- Assemble the table ---
  const rows = [
    headerRow,
    [backgroundCell || ''],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
