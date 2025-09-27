/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout (should contain the columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns (image, content)
  // Column 1: image
  const imgEl = gridChildren.find((el) => el.tagName === 'IMG');
  // Column 2: content (heading, subheading, buttons)
  const contentEl = gridChildren.find((el) => el !== imgEl);

  // Ensure both columns exist
  if (!imgEl || !contentEl) return;

  // Reference the actual elements (no cloning)
  const columnsRow = [imgEl, contentEl];

  // Table rows: header and columns
  const rows = [
    ['Columns block (columns3)'],
    columnsRow
  ];

  // Create the table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
