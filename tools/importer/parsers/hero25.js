/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero25)'];

  // 2. Media row: image and YouTube link (not iframe)
  let mediaCell = [];
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // Find the first child div containing an iframe (YouTube embed)
    const embedDiv = Array.from(grid.children).find(div => div.querySelector('iframe'));
    if (embedDiv) {
      // Get the placeholder image
      const img = embedDiv.querySelector('img');
      if (img) mediaCell.push(img);
      // Convert iframe to a link, use iframe title as link text if available
      const iframe = embedDiv.querySelector('iframe');
      if (iframe) {
        const videoLink = document.createElement('a');
        videoLink.href = iframe.src;
        videoLink.textContent = iframe.title || 'Watch video';
        mediaCell.push(videoLink);
      }
    }
  }

  // 3. Content row: Only main visual heading, subheading, CTA(s)
  let contentCell = [];
  // Only add the main visual heading (.h1-heading)
  const headingDiv = grid ? grid.querySelector('.h1-heading') : null;
  if (headingDiv) contentCell.push(headingDiv);
  // Subheading: .subheading
  const subheadingP = grid ? grid.querySelector('p.subheading') : null;
  if (subheadingP) contentCell.push(subheadingP);
  // CTA group: .button-group
  const ctaDiv = grid ? grid.querySelector('.button-group') : null;
  if (ctaDiv) contentCell.push(ctaDiv);
  // Also add the visually hidden heading (screen-reader only) at the end for completeness
  const srHeading = grid ? grid.querySelector('.utility-screen-reader-visible-only') : null;
  if (srHeading) contentCell.push(srHeading);

  // Compose table rows
  const rows = [
    headerRow,
    [mediaCell],
    [contentCell],
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
