/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the columns in order
  const columns = Array.from(grid.children);
  // Defensive: expect at least 4 children for this layout
  if (columns.length < 4) return;

  // Column 1: Name (Taylor Brooks)
  const col1 = columns[0];

  // Column 2: Tags (Casual Vibes, Sporty Looks, Party Ready)
  const col2 = columns[1];

  // Column 3: Heading (Trends made for living bold)
  const heading = columns[2];

  // Column 4: Rich text paragraphs
  const richText = columns[3];

  // Compose column 3: heading + rich text
  const col3 = document.createElement('div');
  // Reference existing elements, not clones
  col3.appendChild(heading);
  col3.appendChild(richText);

  // Table header must match block name exactly
  const headerRow = ['Columns (columns30)'];
  // Table content row: 3 columns
  const contentRow = [col1, col2, col3];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
