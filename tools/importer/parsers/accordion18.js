/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Defensive: get all immediate children that represent accordion items
  // Each divider contains a grid-layout with a heading and content
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // Each divider contains a .w-layout-grid.grid-layout
    const grid = divider.querySelector('.w-layout-grid.grid-layout');
    if (!grid) return;
    // The first child is the heading, second is the content
    const children = grid.children;
    if (children.length < 2) return;
    const titleElem = children[0]; // h4-heading
    const contentElem = children[1]; // rich-text paragraph-lg
    // Push as [title, content] row
    rows.push([titleElem, contentElem]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the block table
  element.replaceWith(table);
}
