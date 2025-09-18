/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the three main columns (visually):
  // [0] - left main feature (a.utility-link-content-block)
  // [1] - middle column (div.flex-horizontal.flex-vertical...)
  // [2] - right column (div.flex-horizontal.flex-vertical...)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // --- LEFT COLUMN ---
  const leftCol = gridChildren[0]; // a.utility-link-content-block

  // --- MIDDLE COLUMN ---
  const middleCol = gridChildren[1]; // div.flex-horizontal...
  // Contains two a.utility-link-content-block (cards)
  const middleCards = Array.from(middleCol.querySelectorAll(':scope > a.utility-link-content-block'));
  const middleWrapper = document.createElement('div');
  middleCards.forEach(card => middleWrapper.appendChild(card));

  // --- RIGHT COLUMN ---
  const rightCol = gridChildren[2]; // div.flex-horizontal...
  const rightLinks = Array.from(rightCol.querySelectorAll(':scope > a.utility-link-content-block'));
  const rightWrapper = document.createElement('div');
  rightLinks.forEach((link, idx) => {
    rightWrapper.appendChild(link);
    if (idx < rightLinks.length - 1) {
      const divider = document.createElement('div');
      divider.className = 'divider';
      rightWrapper.appendChild(divider);
    }
  });

  // Table header row
  const headerRow = ['Columns block (columns2)'];
  // Table content row: 3 columns
  const contentRow = [leftCol, middleWrapper, rightWrapper];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
