/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (should be image and content)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  let imgCol = columns.find((col) => col.tagName === 'IMG' || col.querySelector('img'));
  // Second column: text content
  let textCol = columns.find((col) => col !== imgCol);

  // Defensive: Ensure both columns exist
  if (!imgCol || !textCol) return;

  // Use the actual image element for the table cell
  if (imgCol.tagName !== 'IMG') {
    imgCol = imgCol.querySelector('img');
  }

  // For the text column, extract only the relevant content (heading, paragraph, buttons)
  // Clone the textCol to avoid modifying the original DOM
  const textColClone = textCol.cloneNode(true);
  // Remove any unwanted elements (if any)
  // (In this case, we want to keep all: h1, p, and .button-group)

  // Table header as per instructions
  const headerRow = ['Columns block (columns1)'];
  // Table content row: image in first cell, text content in second cell
  const contentRow = [imgCol, textColClone];

  // Build the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
