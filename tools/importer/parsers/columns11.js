/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children of a container
  function getDirectDivs(parent) {
    return Array.from(parent.querySelectorAll(':scope > div'));
  }

  // Find main content containers
  const mainContainers = getDirectDivs(element);
  let contentGrid = null;
  let imageGrid = null;
  for (const div of mainContainers) {
    if (div.classList.contains('container')) {
      const grids = getDirectDivs(div);
      for (const grid of grids) {
        if (grid.classList.contains('grid-layout') && grid.classList.contains('tablet-1-column')) {
          contentGrid = grid;
        } else if (grid.classList.contains('grid-layout') && grid.classList.contains('mobile-portrait-1-column')) {
          imageGrid = grid;
        }
      }
    }
  }

  // --- Column extraction ---
  // We'll extract all direct children of contentGrid and imageGrid as separate columns
  let columns = [];
  if (contentGrid) {
    const contentDivs = getDirectDivs(contentGrid);
    contentDivs.forEach(div => {
      // For each content div, collect all its children as a column
      const col = [];
      Array.from(div.children).forEach(child => col.push(child));
      // If no children, push the div itself
      if (col.length === 0) col.push(div);
      columns.push(col);
    });
  }
  if (imageGrid) {
    const imageDivs = getDirectDivs(imageGrid);
    imageDivs.forEach(div => {
      const imgs = div.querySelectorAll('img');
      const col = [];
      imgs.forEach(img => col.push(img));
      // If no img, push the div itself
      if (col.length === 0) col.push(div);
      columns.push(col);
    });
  }

  // Remove empty columns
  columns = columns.filter(col => col.length > 0);
  if (columns.length === 0) return;

  const headerRow = ['Columns block (columns11)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  element.replaceWith(table);
}
