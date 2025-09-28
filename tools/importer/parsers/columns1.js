/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate child divs (each is a column)
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each column contains an image; reference the actual <img> DOM node
  const images = columnDivs.map(div => {
    const img = div.querySelector('img');
    return img || '';
  });

  // Table header row must match the target block name exactly
  const headerRow = ['Columns (columns1)'];

  // Table content row: one cell per image/column, referencing the DOM node
  const contentRow = images;

  // Build table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
