/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns1)'];

  // Defensive: get all immediate children (should be the image wrappers)
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Each child contains an image element
  const images = children.map((child) => {
    // Defensive: find the first image in each child
    const img = child.querySelector('img');
    return img || child; // fallback to the child if no image found
  });

  // The columns block expects all images side by side in one row
  const columnsRow = images;

  // Compose the table data
  const tableData = [headerRow, columnsRow];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
