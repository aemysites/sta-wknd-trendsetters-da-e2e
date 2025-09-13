/* global WebImporter */
export default function parse(element, { document }) {
  // Only parse if this is the expected section
  if (!element.classList.contains('section')) return;

  // Find the main grid layout (contains two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two: content, image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: all content except the image
  const leftCol = gridChildren[0];
  // Second column: image
  const rightCol = gridChildren[1];

  // --- Left column content ---
  // Collect all block-level elements in leftCol for flexibility
  const leftCellContent = [];
  // Get all direct children (to preserve order and all content)
  Array.from(leftCol.children).forEach((child) => {
    // Only add if it contains text or is a button group
    if (
      child.tagName.match(/H\d|P|DIV|UL|OL|SECTION|ARTICLE|ASIDE|NAV|A/) ||
      child.classList.length > 0
    ) {
      leftCellContent.push(child);
    }
  });

  // --- Right column content ---
  // Just the image (could be wrapped in a div)
  let rightCellContent = [];
  if (rightCol.tagName === 'IMG') {
    rightCellContent = [rightCol];
  } else {
    // If it's a wrapper, grab all images inside
    const imgs = rightCol.querySelectorAll('img');
    if (imgs.length) {
      rightCellContent = Array.from(imgs);
    } else {
      // fallback: include the whole rightCol if no img found
      rightCellContent = [rightCol];
    }
  }

  // --- Table header ---
  const headerRow = ['Columns (columns15)'];
  // --- Table content row ---
  const contentRow = [leftCellContent, rightCellContent];

  // Create the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
