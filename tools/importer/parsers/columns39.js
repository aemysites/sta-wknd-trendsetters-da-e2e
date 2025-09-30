/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with block name
  const headerRow = ['Columns block (columns39)'];

  // 2. Get all direct child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // 3. Each column cell: use the whole div (contains image)
  // Reference the original divs (do not clone or create new elements)
  const contentRow = columns.map((col) => col);

  // 4. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // 5. Replace the original element
  element.replaceWith(table);
}
