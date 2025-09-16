/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists and is a container with columns
  if (!element || !element.classList.contains('grid-layout')) return;

  // Table header row as required
  const headerRow = ['Columns (columns5)'];

  // Get all immediate children (these are the column divs)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its content (usually an image)
  const columns = columnDivs.map((colDiv) => {
    // Defensive: if the column contains an image, use it directly
    const img = colDiv.querySelector('img');
    if (img) return img;
    // If not, include the whole column div (for future variations)
    return colDiv;
  });

  // Build the table rows
  const rows = [
    headerRow,
    columns,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
