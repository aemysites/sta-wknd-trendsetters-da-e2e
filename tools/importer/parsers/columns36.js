/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  const getChildren = (parent, selector) => Array.from(parent.children).filter(el => el.matches(selector));

  // Find the main grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // There are two main columns visually: left (big card), right (stacked cards/text)
  // Left: the first <a> in the grid (big card)
  const leftCol = grid.querySelector('a.utility-link-content-block');

  // Right: two vertical stacks (first with image cards, second with text-only cards)
  // The next two siblings after the first <a>
  const gridChildren = Array.from(grid.children);
  const leftColIdx = gridChildren.indexOf(leftCol);
  const rightCol1 = gridChildren[leftColIdx + 1]; // flex-horizontal flex-vertical flex-gap-sm (image cards)
  const rightCol2 = gridChildren[leftColIdx + 2]; // flex-horizontal flex-vertical flex-gap-sm (text cards)

  // Compose left column content (big card)
  const leftContent = leftCol;

  // Compose right column content
  // rightCol1: contains 2 image cards (each an <a>)
  // rightCol2: contains 6 text cards (each an <a>), separated by .divider
  const rightColContent = document.createElement('div');
  // Add image cards
  if (rightCol1) {
    const imageCards = rightCol1.querySelectorAll('a.utility-link-content-block');
    imageCards.forEach(card => rightColContent.appendChild(card));
  }
  // Add text cards (with dividers)
  if (rightCol2) {
    // We'll keep the structure as-is, including dividers for visual separation
    Array.from(rightCol2.childNodes).forEach(node => {
      // Only append <a> and .divider
      if (node.nodeType === 1 && (node.matches('a.utility-link-content-block') || node.classList.contains('divider'))) {
        rightColContent.appendChild(node);
      }
    });
  }

  // Build the table
  const headerRow = ['Columns block (columns36)'];
  const contentRow = [leftContent, rightColContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
