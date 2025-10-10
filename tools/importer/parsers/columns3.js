/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all visible text content from the element
  const text = element.textContent.trim();
  const headerRow = ['Columns block (columns3)'];
  const columnsRow = [text];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  element.replaceWith(table);
}
