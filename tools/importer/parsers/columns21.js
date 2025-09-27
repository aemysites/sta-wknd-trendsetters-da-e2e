/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns21)'];

  // Defensive: find the grid container (should be direct child of .container)
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;

  // The grid's direct children: first is logo/social, then three columns of links
  const columns = Array.from(grid.children);

  // There are 4 columns: logo/social, Trends, Inspire, Explore
  // Each is a block of content, so we can reference each column's root element
  // This matches the visual structure in the screenshot

  // Build the content row with each column's content
  const contentRow = columns.map(col => col);

  // Table: header row, then one row with 4 columns
  const table = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(table, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
