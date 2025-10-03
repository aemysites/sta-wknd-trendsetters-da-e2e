/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns40)'];

  // Get all immediate child divs (each is a column cell)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only include non-empty divs
  const columns = columnDivs.filter(div => div && div.childNodes.length > 0);

  // Each column cell contains the entire div (including its image)
  const contentRow = columns.map(div => div);

  // Compose the table rows
  const tableRows = [headerRow, contentRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
