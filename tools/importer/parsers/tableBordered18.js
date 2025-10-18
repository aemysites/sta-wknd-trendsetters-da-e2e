/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as per requirements
  const headerRow = ['Table (bordered, tableBordered18)'];

  // Find all top-level .divider children (each is a row)
  const dividerDivs = element.querySelectorAll(':scope > .divider');
  const rows = dividerDivs.length > 0 ? dividerDivs : element.querySelectorAll(':scope > div');

  // Build table rows: each row has two columns: question and answer
  const tableRows = Array.from(rows).map(row => {
    const grid = row.querySelector('.w-layout-grid');
    if (!grid) return [row.textContent.trim(), ''];
    const cells = grid.querySelectorAll(':scope > div');
    // Extract plain text for both question and answer
    const question = cells[0] ? cells[0].textContent.trim() : '';
    const answer = cells[1] ? cells[1].textContent.trim() : '';
    return [question, answer];
  });

  // Compose the table data
  const tableData = [headerRow, ...tableRows];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix: ensure the header row is a <tr> with a single <td> (not <th>)
  const firstRow = table.querySelector('tr');
  if (firstRow) {
    const th = firstRow.querySelector('th');
    if (th) {
      const td = document.createElement('td');
      td.innerHTML = th.innerHTML;
      th.replaceWith(td);
    }
  }

  // Replace the original element
  element.replaceWith(table);
}
