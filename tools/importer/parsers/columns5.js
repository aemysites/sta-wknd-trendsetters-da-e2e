/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Find the left column (content) and right column (image)
  // Left: the nested grid with heading, paragraph, and buttons
  const leftGrid = grid.querySelector('.w-layout-grid.grid-layout.container');
  let leftContent = null;
  if (leftGrid) {
    // The actual content is the first child of this grid
    leftContent = leftGrid.children[0];
  }

  // Right: the image element (direct child of grid)
  let rightImage = null;
  // Find the first <img> that is a direct child of grid
  Array.from(grid.children).forEach((child) => {
    if (child.tagName === 'IMG' && !rightImage) {
      rightImage = child;
    }
  });

  // Build the table rows
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [
    leftContent || '',
    rightImage || ''
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
