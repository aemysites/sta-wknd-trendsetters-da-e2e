/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // There should be two columns: text/button and image
  // Find the image column
  const imgEl = gridChildren.find((el) => el.tagName === 'IMG');
  // Find the text column
  const textCol = gridChildren.find((el) => el !== imgEl);

  // Ensure both columns exist
  if (!imgEl || !textCol) return;

  // Table header must match target block name exactly
  const headerRow = ['Columns (columns28)'];
  // Table content row: left (textCol), right (imgEl)
  const contentRow = [textCol, imgEl];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the section with the table
  element.replaceWith(table);
}
