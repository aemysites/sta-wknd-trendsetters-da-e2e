/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Accordion (accordion13)'];
  const rows = [headerRow];

  // Defensive: get all immediate children that are .divider
  const dividers = Array.from(element.querySelectorAll(':scope > .divider'));

  dividers.forEach(divider => {
    // Each divider contains a grid-layout with two children: heading and content
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return; // Defensive: skip if grid missing
    const children = Array.from(grid.children);
    if (children.length < 2) return; // Defensive: skip if not enough children

    // Title cell: heading (usually h4-heading)
    const title = children[0];
    // Content cell: rich text (usually .rich-text)
    const content = children[1];

    rows.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
