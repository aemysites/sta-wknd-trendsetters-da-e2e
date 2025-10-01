/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: image and content
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Find the image element (first column)
  const img = gridChildren.find((el) => el.tagName === 'IMG');
  // Find the content div (second column)
  const contentDiv = gridChildren.find((el) => el !== img);

  if (!img || !contentDiv) return;

  // Use the required block header
  const headerRow = ['Columns block (columns3)'];

  // Reference the actual DOM nodes for the table cells
  const columnsRow = [img, contentDiv];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
