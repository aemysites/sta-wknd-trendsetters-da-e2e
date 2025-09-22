/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Extract the video/image block (background asset)
  let backgroundAsset = null;
  const videoDiv = grid.querySelector('.utility-position-relative');
  if (videoDiv) {
    const embed = videoDiv.querySelector('.w-embed-youtubevideo');
    if (embed) {
      // Prefer the <img> as the background asset
      const img = embed.querySelector('img');
      if (img) {
        backgroundAsset = img.cloneNode(true);
      } else {
        // If no image, fallback to the iframe as a link
        const iframe = embed.querySelector('iframe');
        if (iframe && iframe.src) {
          const a = document.createElement('a');
          a.href = iframe.src;
          a.textContent = iframe.src;
          backgroundAsset = a;
        }
      }
    }
  }

  // Extract the heading (title)
  let title = null;
  const titleDiv = grid.querySelector('.h1-heading');
  if (titleDiv) {
    // Wrap as <h1> for semantic meaning
    const h1 = document.createElement('h1');
    h1.textContent = titleDiv.textContent.trim();
    title = h1;
  }

  // Extract the subheading (paragraph)
  let subheading = null;
  const subDiv = grid.querySelector('.utility-padding-top-2rem');
  if (subDiv) {
    const para = subDiv.querySelector('p.subheading');
    if (para) {
      subheading = para.cloneNode(true);
    }
  }

  // Extract CTA buttons
  let ctas = [];
  const ctaDiv = grid.querySelector('.button-group');
  if (ctaDiv) {
    ctas = Array.from(ctaDiv.querySelectorAll('a')).map(a => a.cloneNode(true));
  }

  // Also extract the visually hidden h1 (main heading)
  let mainHeading = null;
  const srHeading = grid.querySelector('h1.utility-screen-reader-visible-only');
  if (srHeading) {
    const h1 = document.createElement('h1');
    h1.textContent = srHeading.textContent.trim();
    mainHeading = h1;
  }

  // Compose the content cell - ensure all relevant text content is included
  const contentCell = [];
  // Add both headings (main and visual)
  if (mainHeading) contentCell.push(mainHeading);
  if (title && (!mainHeading || title.textContent !== mainHeading.textContent)) contentCell.push(title);
  // Add subheading paragraph
  if (subheading) contentCell.push(subheading);
  // Add CTA buttons
  if (ctas.length) contentCell.push(...ctas);

  // Add any additional text nodes from grid that may have been missed
  // (e.g. if there are other text nodes not in the above selectors)
  // This makes the parser more flexible and ensures all text content is included
  const extraText = Array.from(grid.childNodes)
    .filter(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim())
    .map(n => document.createTextNode(n.textContent.trim()));
  if (extraText.length) contentCell.push(...extraText);

  // Build the table
  const headerRow = ['Hero (hero25)'];
  const rows = [];
  rows.push(headerRow);
  rows.push([backgroundAsset ? backgroundAsset : '']);
  rows.push([contentCell]);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
