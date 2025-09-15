/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if this is the header section with the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns in the grid
  // The first is the text + buttons, the second is the image
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // First column: text and buttons
  const leftCol = gridChildren[0];
  // Second column: image
  const rightCol = gridChildren[1];

  // --- Extract content blocks for leftCol to ensure all text is included ---
  const leftColFragment = document.createElement('div');
  // Heading
  const h1 = leftCol.querySelector('h1');
  if (h1) leftColFragment.appendChild(h1.cloneNode(true));
  // Subheading
  const subheading = leftCol.querySelector('.subheading');
  if (subheading) leftColFragment.appendChild(subheading.cloneNode(true));
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftColFragment.appendChild(buttonGroup.cloneNode(true));

  // For the right column, just use the image
  const img = rightCol.querySelector('img');
  let rightColContent = null;
  if (img) {
    rightColContent = img.cloneNode(true);
  }

  // Only add a column if it has content
  const secondRow = [];
  if (leftColFragment.childNodes.length > 0) secondRow.push(leftColFragment);
  if (rightColContent) secondRow.push(rightColContent);
  if (secondRow.length === 0) return;

  // Table header row
  const headerRow = ['Columns block (columns15)'];

  // Build the block table
  const cells = [headerRow, secondRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
