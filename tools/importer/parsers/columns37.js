/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to collect direct children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(el => el.matches(selector));
  }

  // Find the main grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Get the three main children of the grid
  const [mainLeft, mainTopRight, mainBottomRight] = grid.children;

  // Defensive: If structure is not as expected, fallback to single cell
  if (!mainLeft || !mainTopRight || !mainBottomRight) {
    const headerRow = ['Columns block (columns37)'];
    const contentRow = [element];
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      contentRow,
    ], document);
    element.replaceWith(table);
    return;
  }

  // Left column: Large feature (image, tag, heading, description)
  const leftCol = mainLeft;

  // Top right: Two stacked feature cards (each with image, tag, heading, desc)
  const topRightCol = mainTopRight;
  // Bottom right: List of small features (each with heading, desc, divider)
  const bottomRightCol = mainBottomRight;

  // For the right column, combine topRightCol and bottomRightCol into one cell
  // (as visually, they're stacked in one column)
  // But to match the screenshot, we want two columns: left and right
  // Right column: a wrapper div containing both topRightCol and bottomRightCol
  const rightColWrapper = document.createElement('div');
  rightColWrapper.appendChild(topRightCol);
  rightColWrapper.appendChild(bottomRightCol);

  // Build the table
  const headerRow = ['Columns block (columns37)'];
  const contentRow = [leftCol, rightColWrapper];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
