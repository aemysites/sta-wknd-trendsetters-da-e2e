/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the required block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Get all immediate children of the grid container
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Defensive: Only keep children that have an image (as in the source HTML)
  const imageCells = children.map(child => {
    // Find the first image in the child
    const img = child.querySelector('img');
    if (img) {
      return img;
    }
    // If no image, return an empty string (shouldn't happen in this block)
    return '';
  });

  // The columns block expects one row of images side by side
  const tableRows = [headerRow, imageCells];

  // Create the table using the provided utility
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
