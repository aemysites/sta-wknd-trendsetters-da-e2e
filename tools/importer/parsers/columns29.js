/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children (should be 2 divs for 2 columns)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column cell will contain the full aspect-ratio div (with its image)
  const headerRow = ['Columns (columns29)'];
  const contentRow = columnDivs.map((colDiv) => colDiv);

  const tableArray = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}
