/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns21)'];

  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate column children (should be 4: logo/social, Trends, Inspire, Explore)
  const columns = Array.from(grid.children);

  // Defensive: If the first column contains both logo/social and a nav list (Trends), split them
  let col1, col2, col3, col4;
  if (columns.length === 4) {
    // Typical case: columns[0]=logo/social, columns[1]=Trends, columns[2]=Inspire, columns[3]=Explore
    col1 = columns[0];
    col2 = columns[1];
    col3 = columns[2];
    col4 = columns[3];
  } else if (columns.length > 4) {
    // Defensive: sometimes extra columns, take first 4
    col1 = columns[0];
    col2 = columns[1];
    col3 = columns[2];
    col4 = columns[3];
  } else if (columns.length === 1) {
    // If everything is nested in one column, try to extract children
    const innerCols = Array.from(columns[0].children);
    col1 = innerCols[0];
    col2 = innerCols[1];
    col3 = innerCols[2];
    col4 = innerCols[3];
  }

  // Fix casing for logo text: change 'Fashion Blog' to 'FASHION BLOG'
  if (col1) {
    const logoTextDiv = col1.querySelector('.paragraph-xl');
    if (logoTextDiv) logoTextDiv.textContent = 'FASHION BLOG';
  }

  // Ensure all columns are present and not undefined
  const cellsRow = [col1, col2, col3, col4].filter(Boolean);
  if (cellsRow.length !== 4) return;

  const tableArray = [headerRow, cellsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
