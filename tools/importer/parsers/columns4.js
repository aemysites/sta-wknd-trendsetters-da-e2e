/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure we have the expected grid structure
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row: always use block name as specified
  const headerRow = ['Columns block (columns4)'];

  // Get all immediate children (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the main content (image)
  const columns = columnDivs.map((colDiv) => {
    // Find the image inside this column
    const img = colDiv.querySelector('img');
    // Defensive: if no image, just return empty string
    return img || '';
  });

  // Build the table rows
  const rows = [headerRow, columns];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
