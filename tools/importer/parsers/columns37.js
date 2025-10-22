/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the grid-layout (main content wrapper)
  const gridLayout = element.querySelector('.grid-layout');
  if (!gridLayout) return;

  // --- LEFT COLUMN ---
  // The first anchor is the hero card (image + tag + heading + paragraph)
  const leftHero = gridLayout.querySelector('a.utility-link-content-block');

  // --- RIGHT COLUMN ---
  // There are two flex-horizontal containers: one with image cards, one with text cards
  const flexDivs = Array.from(gridLayout.children).filter(div => div.classList.contains('flex-horizontal'));
  // The first flex-horizontal contains image cards
  const flexTop = flexDivs.find(div => div.querySelector('img'));
  // The second flex-horizontal contains only text cards
  const flexBottom = flexDivs.find(div => !div.querySelector('img'));

  // --- RIGHT COLUMN: IMAGE CARDS ---
  let rightImageCards = [];
  if (flexTop) {
    rightImageCards = Array.from(flexTop.querySelectorAll('a.utility-link-content-block'));
  }

  // --- RIGHT COLUMN: TEXT CARDS ---
  let rightTextCards = [];
  let dividers = [];
  if (flexBottom) {
    rightTextCards = Array.from(flexBottom.querySelectorAll('a.utility-link-content-block'));
    dividers = Array.from(flexBottom.querySelectorAll('.divider'));
  }

  // --- Compose left column ---
  // Reference the actual element for fidelity
  const leftColumn = leftHero;

  // --- Compose right column ---
  const rightColumn = document.createElement('div');
  // Add image cards
  rightImageCards.forEach(card => rightColumn.appendChild(card));
  // Add text-only cards, separated by divider if present
  rightTextCards.forEach((card, idx) => {
    rightColumn.appendChild(card);
    if (idx < rightTextCards.length - 1 && dividers[idx]) {
      rightColumn.appendChild(dividers[idx]);
    }
  });

  // --- Table Construction ---
  const headerRow = ['Columns block (columns37)'];
  const contentRow = [leftColumn, rightColumn];
  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
