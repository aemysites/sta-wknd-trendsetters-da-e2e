/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns30)'];

  // Get all immediate child divs (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, find the image inside
  const images = columnDivs.map(div => {
    // Reference the actual image element, not clone or create new
    const img = div.querySelector('img');
    return img || document.createTextNode(''); // Handle empty columns gracefully
  });

  // Compose the table rows
  const rows = [
    headerRow,
    images
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
