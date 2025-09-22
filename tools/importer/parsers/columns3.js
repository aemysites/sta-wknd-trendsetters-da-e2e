/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // First column: image
  const imgEl = columns.find(el => el.tagName === 'IMG');
  // Second column: text content
  const contentEl = columns.find(el => el !== imgEl);

  // Compose content for the second column
  const contentColumn = [];
  if (contentEl) {
    // Heading (h1)
    const heading = contentEl.querySelector('h1');
    if (heading) contentColumn.push(heading);
    // Subheading (p)
    const subheading = contentEl.querySelector('p');
    if (subheading) contentColumn.push(subheading);
    // Button group (all buttons)
    const buttonGroup = contentEl.querySelector('.button-group');
    if (buttonGroup) {
      // Reference the actual button elements (not clones)
      const buttons = Array.from(buttonGroup.querySelectorAll('a'));
      contentColumn.push(...buttons);
    }
  }

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns3)'];
  // Table row: [image, content]
  const columnsRow = [imgEl, contentColumn];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
