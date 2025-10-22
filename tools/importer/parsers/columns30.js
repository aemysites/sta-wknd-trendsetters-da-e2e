/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns30) - two images side by side, no text
  // Defensive: get direct children divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // Each column contains a utility-aspect-1x1 div with an image
  const cells = [];
  // Header row (block name)
  const headerRow = ['Columns block (columns30)'];
  cells.push(headerRow);
  // Second row: each cell contains the image from each column
  const imageRow = columns.map(col => {
    // Find the first image inside this column
    const img = col.querySelector('img');
    // Reference the existing image element (do not clone or create new)
    return img || '';
  });
  cells.push(imageRow);
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
