/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns grid
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column (text)
  const leftCol = gridChildren[0];
  // Right column (image)
  const rightCol = gridChildren[1];

  // --- Left column content ---
  // Collect all leftCol children (preserve semantic HTML)
  const leftContent = document.createElement('div');
  Array.from(leftCol.childNodes).forEach((node) => {
    leftContent.appendChild(node);
  });

  // --- Right column content ---
  // Reference the image element directly (do not clone)
  let rightContent = document.createElement('div');
  const img = rightCol.querySelector('img');
  if (img) {
    rightContent.appendChild(img);
  } else {
    // Defensive: if no image, reference all children
    Array.from(rightCol.childNodes).forEach((node) => {
      rightContent.appendChild(node);
    });
  }

  // --- Table construction ---
  const headerRow = ['Columns block (columns32)'];
  const contentRow = [leftContent, rightContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
