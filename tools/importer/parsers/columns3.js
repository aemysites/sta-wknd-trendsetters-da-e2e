/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns: image (left), content block (right)
  const children = Array.from(grid.children);
  const imgEl = children.find(el => el.tagName === 'IMG');
  const contentEl = children.find(el => el !== imgEl);

  // Defensive: If either column is missing, do nothing
  if (!imgEl || !contentEl) return;

  // Block header as required
  const headerRow = ['Columns (columns3)'];

  // Table row: image in first column, content in second column
  const row = [imgEl, contentEl];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);

  // Replace the original element
  element.replaceWith(table);
}
