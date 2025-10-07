/* global WebImporter */
export default function parse(element, { document }) {
  // Use the block name as the header row, exactly as required
  const headerRow = ['Columns block (columns21)'];

  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // Defensive: Only keep columns that have meaningful content
  const contentColumns = columns.filter(col => col.textContent.trim() || col.querySelector('img'));

  // Remove extraneous <br> tags from visually hidden labels
  contentColumns.forEach(col => {
    col.querySelectorAll('.utility-screen-reader-visible-only br').forEach(br => br.remove());
  });

  // Flatten the column content: extract only the children of each column, not the whole column wrapper
  const secondRow = contentColumns.map(col => {
    const frag = document.createDocumentFragment();
    Array.from(col.childNodes).forEach(child => frag.appendChild(child.cloneNode(true)));
    return frag;
  });

  // Table structure: header row, then one row with all columns side by side
  const cells = [headerRow, secondRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
