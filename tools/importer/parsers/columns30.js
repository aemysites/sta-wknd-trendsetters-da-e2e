/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, reference the existing image element if present
  const columns = columnDivs.map((colDiv) => {
    const img = colDiv.querySelector('img');
    if (img) return img;
    // If no image, include all text content and children
    // (for this HTML, only images are present)
    return colDiv;
  });

  // Build the table rows
  const headerRow = ['Columns block (columns30)'];
  const columnsRow = columns;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  element.replaceWith(table);
}
