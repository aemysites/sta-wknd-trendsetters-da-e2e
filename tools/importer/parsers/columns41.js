/* global WebImporter */
export default function parse(element, { document }) {
  // Get the top-level container grids
  const containers = element.querySelectorAll(':scope > div');
  if (containers.length < 2) return;

  // First grid: headline/eyebrow and text/author/button
  const topGrid = containers[0].querySelector('.grid-layout');
  if (!topGrid) return;
  const topCols = topGrid.querySelectorAll(':scope > div');
  if (topCols.length < 2) return;

  // Second grid: images
  const imgGrid = containers[1];
  const imgCells = imgGrid.querySelectorAll('.utility-aspect-1x1');
  if (imgCells.length < 2) return;

  // Build table rows
  const headerRow = ['Columns (columns41)'];
  // Row 2: headline/eyebrow | text/author/button
  const row2 = [topCols[0], topCols[1]];
  // Row 3: image | image
  const row3 = [imgCells[0], imgCells[1]];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row2,
    row3
  ], document);

  element.replaceWith(table);
}
