/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row: always block name
  const headerRow = ['Hero (hero38)'];

  // --- Row 2: Background image (optional) ---
  // This hero has no background image in the HTML or screenshot, so leave blank
  const imageRow = [''];

  // --- Row 3: Content: Heading, Subheading, CTA ---
  // Find the main content container (the grid)
  const grid = element.querySelector('.grid-layout');
  let heading = null;
  let subheading = null;
  let cta = null;

  if (grid) {
    // Find the left column: heading and subheading
    const leftCol = grid.children[0];
    if (leftCol) {
      heading = leftCol.querySelector('h2');
      subheading = leftCol.querySelector('.subheading, p');
    }
    // Find the right column: CTA button
    cta = grid.querySelector('a.button, a.w-button, a');
  }

  // Compose content cell for row 3
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Defensive: If nothing found, fallback to all text
  if (contentCell.length === 0) {
    contentCell.push(document.createTextNode(element.textContent.trim()));
  }

  // Table rows
  const rows = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  // Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
