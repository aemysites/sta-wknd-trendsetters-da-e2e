/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate children (the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only proceed if there are columns
  if (!columns.length) return;

  // Each column may itself have an image or other content
  // For this HTML, each column is a div with an image inside
  const contentRow = columns.map((col) => {
    // Use the whole column div as the cell content for resilience
    return col;
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
