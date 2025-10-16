/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Defensive: Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its content. In this case, each column contains an image.
  // We want each image in its own cell in the second row.
  const imagesRow = columns.map(col => {
    // Find the first image in the column
    const img = col.querySelector('img');
    return img || '';
  });

  // Build the table rows
  const cells = [
    headerRow,
    imagesRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
