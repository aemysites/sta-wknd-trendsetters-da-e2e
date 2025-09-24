/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs of the main grid
  const grid = element.querySelector('.grid-layout');
  let title = null;
  let subheading = null;
  let cta = null;
  let backgroundImage = null;

  if (grid) {
    // Find the text block (usually first child)
    const gridChildren = grid.querySelectorAll(':scope > *');
    for (const child of gridChildren) {
      // Text block
      if (child.querySelector('h2')) {
        title = child.querySelector('h2');
        subheading = child.querySelector('p');
      }
      // CTA block
      if (child.tagName === 'A' && child.classList.contains('button')) {
        cta = child;
      }
    }
  }

  // Try to find a background image (not present in this source, but check for robustness)
  // Look for any <img> inside the section
  backgroundImage = element.querySelector('img');

  // Build table rows
  const headerRow = ['Hero (hero38)'];

  // Row 2: Background image (optional)
  const imageRow = [backgroundImage ? backgroundImage : ''];

  // Row 3: Content (title, subheading, CTA)
  const content = [];
  if (title) content.push(title);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);

  // Defensive: If no content, add empty string
  const contentRow = [content.length ? content : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
