/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct child divs (each is an accordion item)
  const items = Array.from(element.querySelectorAll(':scope > div'));

  // Table header as required
  const headerRow = ['Accordion (accordion18)'];
  const rows = [headerRow];

  items.forEach((item) => {
    // Each item contains a grid-layout with two children: title and content
    const grid = item.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if structure is missing
    const children = Array.from(grid.children);
    // Defensive: Expecting at least 2 children
    const title = children[0] || document.createElement('div');
    const content = children[1] || document.createElement('div');
    rows.push([title, content]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
