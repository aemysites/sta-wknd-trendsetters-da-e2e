/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  // Defensive: get all immediate children that are accordion items
  // Each divider contains a grid-layout with two children: title and content
  const accordionItems = element.querySelectorAll(':scope > .divider');

  accordionItems.forEach((item) => {
    // Each divider contains a grid-layout
    const grid = item.querySelector('.grid-layout');
    if (!grid) return; // skip if structure is unexpected
    // The first child is the title, the second is the content
    const children = grid.children;
    if (children.length < 2) return; // skip if missing content
    const title = children[0];
    const content = children[1];
    rows.push([title, content]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
