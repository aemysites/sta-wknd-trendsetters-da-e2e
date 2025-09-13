/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row as per spec
  const headerRow = ['Columns (columns38)'];

  // Get all immediate child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (image or fallback to div)
  const columns = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img ? img : div;
  });

  // Build the table rows
  const tableRows = [
    headerRow,
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
