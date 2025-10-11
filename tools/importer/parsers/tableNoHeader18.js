/* global WebImporter */
export default function parse(element, { document }) {
  // Table (no header, tableNoHeader18) block header row
  const headerRow = ['Table (no header, tableNoHeader18)'];

  // Find all direct children with class 'divider' (each is a row)
  const faqRows = Array.from(element.querySelectorAll(':scope > .divider'));

  // For each row, extract the two cells: question and answer
  const tableRows = faqRows.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', ''];
    const cells = Array.from(grid.children);
    // Extract text content only for each cell
    const question = cells[0] ? cells[0].textContent.trim() : '';
    const answer = cells[1] ? cells[1].textContent.trim() : '';
    return [question, answer];
  });

  // Compose the final table data
  // Ensure header row is a single-cell row, and each data row is a two-cell row
  const tableData = [headerRow, ...tableRows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix: ensure the header row uses <td> not <th>
  // WebImporter.DOMUtils.createTable uses <th> for the header row by default, so we need to fix it
  // Replace the first <th> in the table with <td>
  const firstRow = block.querySelector('tr');
  if (firstRow) {
    const th = firstRow.querySelector('th');
    if (th) {
      const td = document.createElement('td');
      td.innerHTML = th.innerHTML;
      th.replaceWith(td);
    }
  }

  // Replace the original element
  element.replaceWith(block);
}
