/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the grid container (the one with all the images)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get all immediate child divs of the grid (each column)
  const columnDivs = Array.from(grid.querySelectorAll(':scope > div'));

  // For each column, extract its main content (the innermost image wrapper)
  const cells = columnDivs.map((colDiv) => {
    // Find the innermost div with the image
    const aspectDiv = colDiv.querySelector(':scope > div');
    if (aspectDiv) {
      // Defensive: If aspectDiv contains an image, use it
      const img = aspectDiv.querySelector('img');
      if (img) return img;
      // If not, use the aspectDiv itself
      return aspectDiv;
    }
    // Fallback: use the column div itself
    return colDiv;
  });

  // Build the table rows
  const headerRow = ['Columns block (columns8)'];
  const contentRow = cells;

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
