/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each accordion item)
  const itemDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row as required
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  itemDivs.forEach((itemDiv) => {
    // Each itemDiv contains a .w-layout-grid with two children: title and content
    const grid = itemDiv.querySelector('.w-layout-grid');
    if (!grid) return; // Defensive: skip if grid missing
    const children = Array.from(grid.children);
    if (children.length < 2) return; // Defensive: skip if not enough children
    const title = children[0];
    const content = children[1];
    rows.push([title, content]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
