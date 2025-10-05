/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns1)'];

  // Defensive: get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, collect its content (in this case, each contains an image)
  const contentRow = columns.map(col => {
    // If the column contains an image, use the image element directly
    const img = col.querySelector('img');
    if (img) return img;
    // If not, use the whole column (for future-proofing)
    return col;
  });

  // Compose table rows: header, then one row with all images as columns
  const rows = [headerRow, contentRow];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
