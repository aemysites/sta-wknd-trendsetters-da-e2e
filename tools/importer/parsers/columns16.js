/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const gridContainer = element.querySelector('.grid-layout');
  if (!gridContainer) return;

  // Get all direct children of the grid (each is a column)
  const columnDivs = Array.from(gridContainer.children);

  // For each column, get the innermost image element (reference, not clone)
  const imageCells = columnDivs.map((col) => {
    const img = col.querySelector('img');
    return img || document.createTextNode(''); // always a cell, empty if missing
  });

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns16)'];

  // Compose the table rows
  const rows = [
    headerRow,
    imageCells,
  ];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
