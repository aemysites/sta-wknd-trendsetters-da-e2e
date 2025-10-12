/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Accordion (accordion18)'];

  // Find all direct children that represent accordion items (each .divider)
  const accordionItems = Array.from(element.querySelectorAll(':scope > .divider'));

  // Defensive: if no direct .divider children, maybe the structure is nested one level deeper
  let items = accordionItems;
  if (items.length === 0) {
    // Try to find .divider deeper in the tree
    items = Array.from(element.querySelectorAll('.divider'));
  }

  const rows = [headerRow];

  items.forEach((item) => {
    // Each .divider contains a .w-layout-grid with two children: heading and content
    const grid = item.querySelector('.w-layout-grid');
    if (grid) {
      // First child: heading/title
      const title = grid.children[0];
      // Second child: content/body
      const content = grid.children[1];
      if (title && content) {
        rows.push([title, content]);
      }
    }
  });

  // Defensive: if no .divider found, try to parse fallback structure (e.g. all grids)
  if (rows.length === 1) {
    const grids = Array.from(element.querySelectorAll('.w-layout-grid'));
    grids.forEach((grid) => {
      const title = grid.children[0];
      const content = grid.children[1];
      if (title && content) {
        rows.push([title, content]);
      }
    });
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
