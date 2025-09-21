/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required header row
  const headerRow = ['Columns block (columns1)'];

  // Defensive: get all immediate children (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Each column contains one image (per HTML structure)
  const imagesRow = columns.map(col => {
    // Defensive: find the first img inside each column
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Compose the table rows
  const rows = [
    headerRow,
    imagesRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
