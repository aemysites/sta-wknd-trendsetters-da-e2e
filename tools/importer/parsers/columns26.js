/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the main grid containing the two columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // The first two children of the grid are the left and right columns
  // Defensive: filter out dividers or non-content nodes
  const gridChildren = Array.from(grid.children).filter((child) => {
    // Exclude divider lines and empty nodes
    if (child.classList.contains('divider')) return false;
    if (child.tagName === 'SVG') return false;
    return true;
  });

  // There are two main content columns: left (heading), right (quote)
  const leftCol = document.createElement('div');
  const rightCol = document.createElement('div');

  // The first two elements in gridChildren are the heading and the quote
  if (gridChildren[0]) leftCol.appendChild(gridChildren[0]);
  if (gridChildren[1]) rightCol.appendChild(gridChildren[1]);

  // Now, find the testimonial grid (with avatar, name, and logo)
  const testimonialGrid = element.querySelector('.w-layout-grid.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  if (testimonialGrid) {
    // The testimonial grid has three children: divider, flex-horizontal (avatar+name), and logo svg
    const testimonialChildren = Array.from(testimonialGrid.children);
    // flex-horizontal contains avatar and name
    const flexRow = testimonialChildren.find((c) => c.classList.contains('flex-horizontal'));
    // logo svg is the last child
    const logoDiv = testimonialChildren.find((c) => c.tagName === 'DIV' && c.querySelector('svg'));

    // For the bottom row, left cell: avatar + name, right cell: logo
    var leftBottom = flexRow || document.createElement('div');
    var rightBottom = logoDiv || document.createElement('div');
  } else {
    var leftBottom = document.createElement('div');
    var rightBottom = document.createElement('div');
  }

  // Compose the table rows
  const headerRow = ['Columns block (columns26)'];
  const contentRow = [leftCol, rightCol];
  const bottomRow = [leftBottom, rightBottom];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
    bottomRow
  ], document);

  element.replaceWith(table);
}
