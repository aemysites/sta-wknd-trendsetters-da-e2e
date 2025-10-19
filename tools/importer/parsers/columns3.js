/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const children = Array.from(grid.children);

  // --- COLUMN 1: IMAGE ---
  // Reference the image element directly
  const img = grid.querySelector('img');
  // If no image, leave cell empty
  const imageCell = img || '';

  // --- COLUMN 2: TEXT ---
  // Find the div containing heading, subheading, and buttons
  let textColDiv = null;
  for (const child of children) {
    if (child !== img && child.querySelector('h1')) {
      textColDiv = child;
      break;
    }
  }
  // Defensive fallback: find div with h1 if not found above
  if (!textColDiv) {
    textColDiv = grid.querySelector('h1')?.parentElement;
  }
  // If no text column, leave cell empty
  const textCell = textColDiv || '';

  // --- TABLE CONSTRUCTION ---
  // Header row must match block name exactly
  const headerRow = ['Columns (columns3)'];
  // Second row: columns (image, text)
  const contentRow = [imageCell, textCell];

  // Compose table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
