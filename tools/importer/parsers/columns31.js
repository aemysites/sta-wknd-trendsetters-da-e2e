/* global WebImporter */

export default function parse(element, { document }) {
  // Find the grid layout that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get direct children of the grid (should be 4: name, tags, heading, rich text)
  const gridChildren = Array.from(grid.children);

  // Defensive: ensure we have at least 4 children
  if (gridChildren.length < 4) return;

  // Column 1: Name
  const nameEl = gridChildren[0];
  // Column 2: Tags
  const tagsEl = gridChildren[1];
  // Column 3: Heading and rich text
  const headingEl = gridChildren[2];
  const richTextEl = gridChildren[3];

  // Compose column 3: heading + rich text
  const col3 = document.createElement('div');
  if (headingEl) col3.appendChild(headingEl);
  if (richTextEl) col3.appendChild(richTextEl);

  // Table header row
  const headerRow = ['Columns (columns31)'];

  // Table content row: three columns
  const contentRow = [nameEl, tagsEl, col3];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element with the new table
  element.replaceWith(table);
}
