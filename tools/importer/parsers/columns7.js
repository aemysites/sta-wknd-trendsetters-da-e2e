/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the image element (preserve reference)
  const cellsRow = columns.map((col) => {
    const img = col.querySelector('img');
    // If image exists, use the image element itself
    return img || document.createTextNode(''); // Always fill cell, even if empty
  });

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns7)'];
  const tableRows = [headerRow, cellsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
