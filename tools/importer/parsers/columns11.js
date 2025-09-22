/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children divs of a node
  function getDirectDivs(parent) {
    return Array.from(parent.children).filter((el) => el.tagName === 'DIV');
  }

  // Find the main grid (2 columns: left = heading, right = summary + author + button)
  const container = element.querySelector('.container');
  if (!container) return;

  const grids = container.querySelectorAll('.grid-layout');
  if (grids.length < 1) return;

  // First grid: top section (heading/eyebrow/summary)
  const topGrid = grids[0];
  const topGridCols = getDirectDivs(topGrid);
  if (topGridCols.length < 2) return;

  // Left column: eyebrow + heading
  const leftCol = topGridCols[0];
  // Right column: summary, author, button
  const rightCol = topGridCols[1];

  // Second grid: images (2 columns)
  let imagesGrid = null;
  if (grids.length > 1) {
    imagesGrid = grids[1];
  } else {
    // fallback: find next .grid-layout after container
    imagesGrid = element.querySelector('.mobile-portrait-1-column');
  }
  if (!imagesGrid) return;
  const imageDivs = getDirectDivs(imagesGrid);

  // Compose first row (header)
  const headerRow = ['Columns (columns11)'];

  // Compose second row (main columns)
  // Left: eyebrow + heading
  // Right: summary + author + button
  const secondRow = [leftCol, rightCol];

  // Compose third row (images)
  // Each image in its own column
  const imagesRow = imageDivs.map(div => {
    // Defensive: only include if contains an <img>
    const img = div.querySelector('img');
    if (img) return div;
    return '';
  });

  // Only add images row if there are at least 2 images
  const rows = [headerRow, secondRow];
  if (imagesRow.length >= 2) {
    rows.push(imagesRow);
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
