/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns27)'];

  // Defensive: find the main grid inside the section
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Expecting: first two <p> are the two columns of the first row
  // Then a nested grid for the bottom row (avatar/testimonial)
  const children = Array.from(grid.children);
  if (children.length < 3) return;

  // First row: two columns (heading and testimonial)
  const col1 = children[0]; // heading
  const col2 = children[1]; // testimonial text

  // Second row: nested grid with avatar/testimonial and logo
  const nestedGrid = children[2];
  const nestedChildren = Array.from(nestedGrid.children);

  // Defensive: find the flex row for avatar/testimonial and the logo image
  let bottomLeft = null;
  let bottomRight = null;
  for (const child of nestedChildren) {
    if (child.classList.contains('flex-horizontal')) {
      bottomLeft = child;
    } else if (child.querySelector('img')) {
      bottomRight = child;
    }
  }

  // If not found, fallback to order
  if (!bottomLeft && nestedChildren.length > 1) bottomLeft = nestedChildren[1];
  if (!bottomRight && nestedChildren.length > 2) bottomRight = nestedChildren[2];

  // Compose table rows
  const row1 = [col1, col2];
  const row2 = [bottomLeft, bottomRight];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1,
    row2,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
