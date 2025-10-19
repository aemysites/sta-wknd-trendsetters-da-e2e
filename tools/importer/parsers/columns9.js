/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns9)'];

  // Find the grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid
  const children = Array.from(grid.children);

  // Left column: main heading and description
  const leftCol = children.find(child => child.tagName === 'DIV');
  if (!leftCol) return;

  // Right column: contact info list
  const contactList = children.find(child => child.tagName === 'UL');
  // Image (should be in a separate row spanning both columns)
  const image = children.find(child => child.tagName === 'IMG');

  // Build left column cell: all heading and paragraph elements
  const leftColContent = Array.from(leftCol.children);

  // Build right column cell: contact info list
  const rightColContent = contactList ? [contactList] : [];

  // Table rows
  const rows = [
    headerRow,
    [leftColContent, rightColContent],
  ];

  // If image exists, add a row that spans both columns
  if (image) {
    // Create a td that spans 2 columns
    const imgRow = [image];
    imgRow.colspan = 2;
    rows.push(imgRow);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // If we added an image row, set its colspan to 2
  if (image) {
    const tableRows = block.querySelectorAll('tr');
    if (tableRows.length > 2) {
      const imgCell = tableRows[2].querySelector('td');
      if (imgCell) imgCell.setAttribute('colspan', '2');
    }
  }

  // Replace the original element with the block table
  element.replaceWith(block);
}
