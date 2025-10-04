/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get the two columns
  const gridChildren = Array.from(grid.children);
  const col1 = gridChildren[0]; // h2
  const col2 = gridChildren[1]; // div with p and a

  // Defensive: ensure both columns exist
  if (!col1 || !col2) return;

  // For col2, preserve all its children as a fragment
  const col2Fragment = document.createDocumentFragment();
  Array.from(col2.childNodes).forEach((node) => {
    // Only append nodes with actual content
    if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
      col2Fragment.appendChild(node);
    }
  });

  // Table header row
  const headerRow = ['Columns block (columns8)'];
  // Table content row: two columns
  const contentRow = [col1, col2Fragment];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the block
  element.replaceWith(block);
}
