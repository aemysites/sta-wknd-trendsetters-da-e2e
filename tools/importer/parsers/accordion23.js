/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required (exactly one column)
  const headerRow = ['Accordion (accordion23)'];
  const rows = [headerRow];

  // Defensive: Only select immediate children dividers
  const dividerDivs = Array.from(element.querySelectorAll(':scope > .divider'));

  dividerDivs.forEach(divider => {
    // Each divider contains a grid-layout with two children: title and content
    const grid = divider.querySelector('.grid-layout');
    if (!grid) return;
    const gridChildren = Array.from(grid.children);
    if (gridChildren.length < 2) return;
    const title = gridChildren[0]; // h4-heading
    const content = gridChildren[1]; // rich-text paragraph-lg
    rows.push([title, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
