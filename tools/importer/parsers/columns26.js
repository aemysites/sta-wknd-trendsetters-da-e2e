/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get all immediate children of the main grid
  const gridChildren = Array.from(mainGrid.children);

  // First two children are the left and right columns (heading and paragraph)
  const leftCol = gridChildren[0]; // Heading
  const rightCol = gridChildren[1]; // Paragraph

  // Third child is a nested grid for the bottom row
  const bottomGrid = gridChildren[2];
  let bottomLeft, bottomRight;
  if (bottomGrid && bottomGrid.classList.contains('grid-layout')) {
    const bottomChildren = Array.from(bottomGrid.children);
    // Defensive: find the flex-horizontal (avatar + name) and the right utility block (logo)
    bottomLeft = bottomChildren.find(child => child.classList.contains('flex-horizontal'));
    bottomRight = bottomChildren.find(child => child.classList.contains('utility-display-inline-block'));
  }

  // Build the first row: block name
  const headerRow = ['Columns block (columns26)'];

  // Build the second row: main columns
  const secondRow = [
    [leftCol, bottomLeft].filter(Boolean), // Left column: heading + avatar/name
    [rightCol, bottomRight].filter(Boolean) // Right column: paragraph + logo
  ];

  // Create the table
  const cells = [
    headerRow,
    secondRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
