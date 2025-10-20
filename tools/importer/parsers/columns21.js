/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout inside the footer
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 4) return;

  // Prepare the header row for the block table
  const headerRow = ['Columns block (columns21)'];

  // For each column, extract only the relevant content: text, images, and links
  // Remove unnecessary wrapper divs and attributes for a clean block table
  function extractColumnContent(col) {
    // If branding/social column (first column)
    if (col.querySelector('.logo')) {
      const frag = document.createDocumentFragment();
      // Logo
      const logo = col.querySelector('.logo');
      if (logo) frag.appendChild(logo.cloneNode(true));
      // Social icons
      const icons = col.querySelector('.footer-icons-group');
      if (icons) frag.appendChild(icons.cloneNode(true));
      return frag;
    }
    // For link columns (Trends, Inspire, Explore)
    const ul = col.querySelector('ul');
    if (ul) {
      // Only include the <ul> element and its children
      return ul.cloneNode(true);
    }
    // fallback: clone all children
    const frag = document.createDocumentFragment();
    Array.from(col.children).forEach(child => {
      frag.appendChild(child.cloneNode(true));
    });
    return frag;
  }

  // Only use the first four columns for the block
  const contentRow = columns.slice(0, 4).map(extractColumnContent);

  // Build the table data
  const tableData = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
