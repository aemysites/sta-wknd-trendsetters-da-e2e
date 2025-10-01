/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Find all direct children with class 'divider' (each is an accordion item)
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // Each divider contains a grid with two children: title and content
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Get all direct children of the grid
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length < 2) return;
    const title = gridChildren[0];
    const content = gridChildren[1];
    rows.push([title, content]);
  });

  // If the first child is not a divider, check if it's a wrapper (e.g., flex-horizontal)
  if (rows.length === 1) {
    // Defensive: try to find .divider inside the element
    const innerDividers = element.querySelectorAll('.divider');
    innerDividers.forEach((divider) => {
      const grid = divider.querySelector('.w-layout-grid');
      if (!grid) return;
      const gridChildren = grid.querySelectorAll(':scope > div');
      if (gridChildren.length < 2) return;
      const title = gridChildren[0];
      const content = gridChildren[1];
      rows.push([title, content]);
    });
  }

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
