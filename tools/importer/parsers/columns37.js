/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirement
  const headerRow = ['Columns block (columns37)'];

  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The first column (left) is the large card (image + tag + heading + desc)
  const leftCard = grid.querySelector('a.utility-link-content-block');

  // The second column (right) is a vertical stack of two cards (each with image, tag, heading, desc)
  // These are inside the first .flex-horizontal.flex-vertical.flex-gap-sm
  const rightCardsContainer = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm')[0];
  let rightCards = [];
  if (rightCardsContainer) {
    rightCards = Array.from(rightCardsContainer.querySelectorAll('a.utility-link-content-block'));
  }

  // The third column (rightmost) is a vertical stack of text cards separated by dividers
  // These are inside the second .flex-horizontal.flex-vertical.flex-gap-sm
  const textCardsContainer = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm')[1];
  let textCards = [];
  if (textCardsContainer) {
    // Each card is an <a>, dividers are <div class="divider">
    textCards = Array.from(textCardsContainer.querySelectorAll('a.utility-link-content-block'));
  }

  // Compose the first row after header: 3 columns
  // 1. Large left card
  // 2. Two stacked cards (as a vertical group)
  // 3. Vertical stack of text cards (as a group)

  // For robustness, wrap the rightCards and textCards in a div to preserve their vertical stacking
  const rightCardsDiv = document.createElement('div');
  rightCards.forEach(card => rightCardsDiv.appendChild(card));

  // For text cards, also preserve the dividers between them
  const textCardsDiv = document.createElement('div');
  if (textCardsContainer) {
    // Copy all children (cards and dividers) to preserve structure
    Array.from(textCardsContainer.childNodes).forEach(child => textCardsDiv.appendChild(child));
  }

  const row1 = [leftCard, rightCardsDiv, textCardsDiv];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
