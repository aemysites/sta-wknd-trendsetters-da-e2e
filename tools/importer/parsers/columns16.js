/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Columns block (columns16)
  const headerRow = ['Columns block (columns16)'];

  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const gridChildren = Array.from(grid.children);

  // Find the left column (headings and paragraph)
  const leftCol = gridChildren.find(
    (child) => child.querySelector('h2') || child.querySelector('h3')
  );

  // Find the contact list (ul)
  const contactList = grid.querySelector('ul');

  // Find the main photographic image (not SVG icons)
  const mainImg = Array.from(grid.querySelectorAll('img')).find(img =>
    img.src && img.src.includes('.avif')
  );

  // --- Build columns for the second row ---
  // Left column: leftCol (headings and paragraph)
  // Right column: contactList (ul)
  const columnsRow = [
    leftCol ? leftCol : '',
    contactList ? contactList : ''
  ];

  // --- Build the image row (spans both columns) ---
  // Place the main image in a single cell spanning both columns
  const imageRow = [
    mainImg ? mainImg : '',
  ];

  // Compose the table rows
  const rows = [
    headerRow,
    columnsRow,
    imageRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document, { 
    cells: [
      {},
      {},
      { colspan: 2 }
    ]
  });

  // Replace the original element with the new table
  element.replaceWith(table);
}
