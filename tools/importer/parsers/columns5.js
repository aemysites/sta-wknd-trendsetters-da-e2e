/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid container (the direct child of section)
  const grid = element.querySelector(':scope > div');
  if (!grid) return;

  // Defensive: get all immediate children of the grid
  const gridChildren = Array.from(grid.children);
  // There should be two: [content column, image column]
  if (gridChildren.length < 2) return;

  // Left column: content block (contains heading, paragraph, buttons)
  const contentBlock = gridChildren[0];
  // Right column: image
  const imageBlock = gridChildren[1];

  // Header row
  const headerRow = ['Columns (columns5)'];

  // Second row: two columns
  // Left cell: all content from the left block
  // Right cell: the image element itself
  const leftCell = contentBlock;
  const rightCell = imageBlock;

  const tableCells = [
    headerRow,
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
