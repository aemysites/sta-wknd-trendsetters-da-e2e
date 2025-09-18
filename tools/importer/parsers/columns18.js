/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);
  // There should be 3: left content, right list, image
  // But sometimes the image may be last, so let's find them by type
  let leftContent = null;
  let rightList = null;
  let image = null;

  gridChildren.forEach((child) => {
    if (child.tagName === 'UL') {
      rightList = child;
    } else if (child.tagName === 'IMG') {
      image = child;
    } else {
      leftContent = child;
    }
  });

  // Defensive: make sure all main pieces exist
  if (!leftContent || !rightList || !image) return;

  // Column 1: left text content (eyebrow, heading, subheading)
  // We'll combine leftContent and rightList into one column, as in the screenshot
  // The rightList is visually aligned to the right of leftContent, so we want them together
  // But the screenshot shows left column (text + list), right column (image)
  const leftColumn = document.createElement('div');
  leftColumn.append(leftContent, rightList);

  // Column 2: image
  // Use the image element directly

  // Table header
  const headerRow = ['Columns block (columns18)'];
  // Table columns row
  const columnsRow = [leftColumn, image];

  // Build the table
  const cells = [headerRow, columnsRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
