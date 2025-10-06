/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion items: direct children with class 'divider'
  const items = Array.from(element.querySelectorAll(':scope > .divider'));

  // Table header row as required
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  items.forEach(divider => {
    // Each divider contains a grid-layout
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return; // skip if missing
    const children = Array.from(grid.children);
    if (children.length < 2) return; // skip if missing
    const title = children[0]; // reference, do not clone
    const content = children[1]; // reference, do not clone
    rows.push([title, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
