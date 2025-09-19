/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns block (columns5)'];

  // Defensive: get the grid container (main columns wrapper)
  // The first child div is the grid with two children: content and image
  const grid = element.querySelector(':scope > div');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Find the content column (contains text/buttons) and the image column
  let contentCol = null;
  let imageCol = null;
  for (const child of gridChildren) {
    if (child.tagName === 'DIV') {
      contentCol = child;
    } else if (child.tagName === 'IMG') {
      imageCol = child;
    }
  }

  // Defensive: ensure both columns exist
  if (!contentCol || !imageCol) return;

  // The content column contains: h2, rich text, button group
  // We'll reference the whole contentCol for resilience
  // The image column is just the image element

  // Build the second row (columns)
  const columnsRow = [contentCol, imageCol];

  // Table cells array
  const cells = [headerRow, columnsRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
