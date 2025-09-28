/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Table (no header, tableNoHeader23)'];

  // Collect all immediate child divs (each is a Q&A pair)
  const qaDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Each Q&A is inside a .divider > .w-layout-grid (grid-layout)
  const rows = qaDivs.map((divider) => {
    // Defensive: find the grid-layout inside this divider
    const grid = divider.querySelector('.w-layout-grid.grid-layout');
    if (!grid) return [];
    // Each grid-layout has two children: heading and paragraph
    const children = Array.from(grid.children);
    // Defensive: ensure we have two columns
    if (children.length < 2) return [];
    // Place each child element directly in its cell
    return [children[0], children[1]];
  }).filter(row => row.length === 2); // Only valid rows

  // Compose the table cells array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
