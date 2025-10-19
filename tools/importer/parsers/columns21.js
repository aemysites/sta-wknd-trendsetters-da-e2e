/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the footer
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length !== 4) return; // Ensure exactly 4 columns

  // Build the header row as required
  const headerRow = ['Columns block (columns21)'];

  // For each column, flatten the content to avoid wrapping the entire div
  const columnsRow = columns.map((col, idx) => {
    // First column: logo and social icons
    if (idx === 0) {
      const frag = document.createDocumentFragment();
      const logo = col.querySelector('.logo');
      if (logo) frag.appendChild(logo.cloneNode(true));
      const iconsGroup = col.querySelector('.footer-icons-group');
      if (iconsGroup) {
        const iconsClone = iconsGroup.cloneNode(true);
        iconsClone.querySelectorAll('.utility-screen-reader-visible-only').forEach(el => {
          el.textContent = el.textContent.replace(/\s*\n\s*/g, '').replace(/<br\s*\/?>(\s*)?/gi, '');
        });
        frag.appendChild(iconsClone);
      }
      return frag;
    }
    // Other columns: just use the <ul> element
    const ul = col.querySelector('ul');
    return ul ? ul.cloneNode(true) : col.cloneNode(true);
  });

  // Build the table data
  const tableData = [
    headerRow,
    columnsRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
