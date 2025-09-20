/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists and is a container
  if (!element || !element.children || element.children.length === 0) return;

  // Header row as required by block spec
  const headerRow = ['Columns (columns12)'];

  // Get all direct child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its image (if present)
  const images = columns.map((col) => {
    // Defensive: find the image inside each column div
    const img = col.querySelector('img');
    return img ? img : '';
  });

  // Build the table rows
  const cells = [
    headerRow,
    images
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
