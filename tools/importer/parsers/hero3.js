/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero3)'];

  // 2. Image row (background or prominent visual)
  // Find the main image (first img in grid)
  let imageEl = null;
  const gridDiv = element.querySelector('.grid-layout');
  if (gridDiv) {
    imageEl = gridDiv.querySelector('img');
  }
  // If not found, fallback to any img
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  const imageRow = [imageEl ? imageEl : ''];

  // 3. Content row: Heading, subheading, CTA
  let contentCell = [];
  // Find the content container (the div next to the image)
  let contentDiv = null;
  if (gridDiv) {
    // Get all grid children
    const gridChildren = Array.from(gridDiv.children);
    // Find the first div that's not the image
    contentDiv = gridChildren.find(child => child !== imageEl && child.tagName === 'DIV');
  }
  if (contentDiv) {
    // Heading
    const heading = contentDiv.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Subheading (paragraph)
    const subheading = contentDiv.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // Button group (CTA)
    const buttonGroup = contentDiv.querySelector('.button-group');
    if (buttonGroup) {
      // Only include links (not the group wrapper)
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) contentCell.push(...ctas);
    }
  }
  // Defensive: If nothing found, fallback to all text content
  if (contentCell.length === 0) {
    contentCell.push(document.createTextNode(element.textContent.trim()));
  }
  const contentRow = [contentCell];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}
