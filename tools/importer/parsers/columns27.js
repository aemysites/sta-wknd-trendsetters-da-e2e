/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid layout
  const container = element.querySelector(':scope > .container');
  if (!container) return;
  const grid = container.querySelector(':scope > .grid-layout');
  if (!grid) return;

  // The grid has: [heading, quote, author block]
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // Left column: heading + author meta
  const leftCol = document.createElement('div');
  // Heading
  if (gridChildren[0]) leftCol.appendChild(gridChildren[0]);
  // Author meta (avatar, name, title)
  const authorBlock = gridChildren[2];
  if (authorBlock) {
    // Only avatar + name/title (skip divider and logo)
    const authorFlex = authorBlock.querySelector('.flex-horizontal');
    if (authorFlex) leftCol.appendChild(authorFlex);
  }

  // Right column: quote + logo (if present)
  const rightCol = document.createElement('div');
  // Quote
  if (gridChildren[1]) rightCol.appendChild(gridChildren[1]);
  // Logo (last child of author block)
  if (authorBlock) {
    const logo = authorBlock.querySelector('.utility-display-inline-block');
    if (logo) rightCol.appendChild(logo);
  }

  // Table header row
  const headerRow = ['Columns block (columns27)'];
  // Table content row: two columns
  const contentRow = [leftCol, rightCol];

  // Build table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(table);
}
