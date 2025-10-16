/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns31)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: If the grid doesn't have at least 3 children, bail
  if (columns.length < 3) return;

  // The layout per screenshot and HTML:
  // - Column 1: Name (Taylor Brooks)
  // - Column 2: Tags (Casual Vibes, Sporty Looks, Party Ready)
  // - Column 3: Heading + Rich text (h2 + paragraphs)

  // Prepare each column's content
  const col1 = columns[0]; // Name
  const col2 = columns[1]; // Tags
  // For column 3, combine heading and rich text into a fragment
  const col3Fragment = document.createDocumentFragment();
  if (columns[2]) col3Fragment.appendChild(columns[2]); // Heading
  if (columns[3]) col3Fragment.appendChild(columns[3]); // Rich text

  // Build the table rows
  const rows = [
    headerRow,
    [col1, col2, col3Fragment],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
