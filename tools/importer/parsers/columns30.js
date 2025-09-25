/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: get all immediate children (should be two divs, each with an img)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each child div is a column (each contains an image)
  // Header row
  const headerRow = ['Columns block (columns30)'];

  // Second row: columns for each image
  const columns = children.map((colDiv) => {
    // Defensive: find the image inside each column div
    const img = colDiv.querySelector('img');
    // Only include the image if it exists
    return img ? img : document.createTextNode('');
  });

  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
