/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Ensure we have expected children
  // [0]: Name (Taylor Brooks)
  // [1]: Tags (Casual Vibes, Sporty Looks, Party Ready)
  // [2]: Heading (Trends made for living bold)
  // [3]: Rich text paragraphs
  if (gridChildren.length < 4) return;

  // Column 1: Name only
  const col1 = document.createElement('div');
  col1.appendChild(gridChildren[0]); // Name

  // Column 2: Tags only
  const col2 = document.createElement('div');
  col2.appendChild(gridChildren[1]); // Tags

  // Column 3: Heading + paragraphs (vertical stack)
  const col3 = document.createElement('div');
  col3.appendChild(gridChildren[2]); // Heading
  col3.appendChild(gridChildren[3]); // Rich text

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns31)'];
  const contentRow = [col1, col2, col3];

  // Create the table with correct structure
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the table
  element.replaceWith(table);
}
