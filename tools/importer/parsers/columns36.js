/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // --- LEFT COLUMN ---
  // The first child is the large card (anchor tag)
  const leftCard = grid.querySelector('a.utility-link-content-block');

  // --- RIGHT COLUMN ---
  // There are two flex-horizontal containers (each is a row in the right column)
  const flexRows = grid.querySelectorAll('.flex-horizontal');

  // First right column row: two image cards (anchor tags)
  const rightCardsRow = flexRows[0];
  const rightCards = rightCardsRow ? Array.from(rightCardsRow.querySelectorAll('a.utility-link-content-block')) : [];

  // Second right column row: text-only cards separated by dividers
  const rightTextRow = flexRows[1];
  const rightTextCards = rightTextRow ? Array.from(rightTextRow.querySelectorAll('a.utility-link-content-block')) : [];
  const rightDividers = rightTextRow ? Array.from(rightTextRow.querySelectorAll('.divider')) : [];

  // --- BUILD TABLE ---
  // Header row
  const headerRow = ['Columns block (columns36)'];

  // Right column cell: stack all right cards (image cards + text-only cards)
  // We'll group them in a div for vertical stacking
  const rightColumnDiv = document.createElement('div');
  // Add image cards (first row)
  rightCards.forEach(card => rightColumnDiv.appendChild(card));
  // Add text-only cards (second row)
  rightTextCards.forEach((card, idx) => {
    rightColumnDiv.appendChild(card);
    // Add divider after each card except the last
    if (idx < rightTextCards.length - 1 && rightDividers[idx]) {
      rightColumnDiv.appendChild(rightDividers[idx]);
    }
  });

  // Compose table rows
  const rows = [
    headerRow,
    [leftCard, rightColumnDiv]
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
