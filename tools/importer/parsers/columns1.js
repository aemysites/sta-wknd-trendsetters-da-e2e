/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name for the header row
  const headerRow = ['Columns block (columns1)'];

  // Defensive: get all immediate children (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For this block, each column contains a single image
  // Build the second row with each image in its own cell
  const images = columns.map(col => {
    // Find the first image inside each column
    const img = col.querySelector('img');
    return img || document.createTextNode(''); // fallback to empty if no image
  });

  // Compose the table rows
  const cells = [
    headerRow,
    images
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
