/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  const getChildren = (parent, selector) => Array.from(parent.children).filter(el => el.matches(selector));

  // 1. Find the grid layout (main content container)
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // 2. Get the left (main) card and the two right-side flex containers
  const [leftCard, rightTop, rightBottom] = grid.children;

  // Defensive: ensure we have the expected structure
  if (!leftCard || !rightTop || !rightBottom) return;

  // 3. Left column: main card (image + tag + heading + desc)
  // Use the entire leftCard anchor as a single cell for robustness
  // 4. Right column: two stacked flex containers
  //    - rightTop: two cards with images/tags/headings/desc
  //    - rightBottom: a flex with only text cards, separated by dividers

  // For rightTop: collect all direct child anchors (cards)
  const rightTopCards = getChildren(rightTop, 'a');

  // We'll build the right column as a single element containing all the right cards and dividers
  const rightColWrapper = document.createElement('div');
  // Add top cards
  rightTopCards.forEach(card => rightColWrapper.appendChild(card));
  // Add bottom cards and dividers in order
  rightBottom.childNodes.forEach(node => {
    // Only append element nodes
    if (node.nodeType === 1) {
      rightColWrapper.appendChild(node);
    }
  });

  // Table structure:
  // [ ['Columns block (columns36)'], [leftCard, rightColWrapper] ]
  const headerRow = ['Columns block (columns36)'];
  const contentRow = [leftCard, rightColWrapper];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
