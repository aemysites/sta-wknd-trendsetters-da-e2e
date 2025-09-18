/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: image and content
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // First column: image
  let imageCell = null;
  const img = columns.find((el) => el.tagName === 'IMG');
  if (img) {
    imageCell = img;
  }

  // Second column: content (textual)
  let contentCell = null;
  const textCol = columns.find((el) => el !== img);
  if (textCol) {
    // Use the whole content block as a cell
    contentCell = textCol;
  }

  // Build the table rows
  const headerRow = ['Columns (columns32)'];
  const contentRow = [imageCell, contentCell];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
