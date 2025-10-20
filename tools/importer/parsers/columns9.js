/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns9)'];

  // Find the grid-layout container (the main columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be: left text, right contacts, image)
  const gridChildren = Array.from(grid.children);

  // Defensive: find the text block (contains h2, h3, p)
  const textBlock = gridChildren.find(child => child.querySelector('h2') && child.querySelector('h3'));

  // Defensive: find the contact list (ul with li items)
  const contactList = grid.querySelector('ul');

  // Defensive: find the main image (img tag not inside icon-container)
  const image = grid.querySelector('img.cover-image');

  // Build the columns row: left = text, right = contacts
  const columnsRow = [
    [
      textBlock || '',
      contactList || ''
    ]
  ];

  // The image row must have the same number of columns as columnsRow (2 columns)
  // Place the image in the left cell, and an empty string in the right cell
  const imageRow = image ? [image, ''] : [];

  // Compose the table rows
  const rows = [
    headerRow,
    ...columnsRow,
  ];
  if (imageRow.length) {
    rows.push(imageRow);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
