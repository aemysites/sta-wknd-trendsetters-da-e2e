/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns23)'];

  // Defensive: get all immediate child dividers (each is a Q&A row)
  const dividerDivs = Array.from(element.querySelectorAll(':scope > .divider'));

  // Each divider contains a grid with two children: heading and paragraph
  const rows = dividerDivs.map(divider => {
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return ['', '']; // fallback in case of unexpected structure
    const children = Array.from(grid.children);
    // Defensive: expect 2 children: heading and rich text
    const heading = children[0] || document.createElement('div');
    const richText = children[1] || document.createElement('div');
    return [heading, richText];
  });

  // Compose the table: header + all content rows
  const tableCells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
