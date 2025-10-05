/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children of a parent by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // Find the main grid and the two flex containers
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // The first child is the big left column (main feature)
  const mainFeature = grid.querySelector('.utility-link-content-block');

  // The next two siblings are flex-horizontal containers for right columns
  const flexContainers = getDirectChildren(grid, 'div');
  // Defensive: filter out the mainFeature if present
  const rightFlexContainers = flexContainers.filter(div => !div.contains(mainFeature));

  // First right column: two cards with images
  let rightColTop = [];
  if (rightFlexContainers[0]) {
    // Each card is an <a>
    const cards = getDirectChildren(rightFlexContainers[0], 'a');
    rightColTop = cards;
  }

  // Second right column: list of text cards separated by dividers
  let rightColBottom = [];
  if (rightFlexContainers[1]) {
    // Each card is an <a>, dividers are <div class="divider">
    const nodes = Array.from(rightFlexContainers[1].childNodes);
    // Group: [a, divider, a, divider, ...]
    nodes.forEach(node => {
      if (node.nodeType === 1 && node.tagName === 'A') {
        rightColBottom.push(node);
      }
    });
  }

  // Compose left column: main feature
  // Compose right column: stack top two cards, then stack the text cards below
  // To match the screenshot, right column should be a vertical stack of all right cards
  const leftCol = mainFeature;
  const rightCol = document.createElement('div');
  // Add top two cards (with images)
  rightCol.append(...rightColTop);
  // Add bottom cards (text only)
  rightCol.append(...rightColBottom);

  // Table structure: header, then 1 row with 2 columns
  const headerRow = ['Columns block (columns37)'];
  const contentRow = [leftCol, rightCol];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
