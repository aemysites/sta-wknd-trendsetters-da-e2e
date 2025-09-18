/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element is present
  if (!element) return;

  // Table header row per spec
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all immediate card containers (each card is a direct child)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Defensive: find icon (first svg inside .icon)
    let iconEl = null;
    const iconWrapper = cardDiv.querySelector(':scope > div > .icon');
    if (iconWrapper) {
      iconEl = iconWrapper.querySelector('svg');
    }
    // Defensive: find text (first p)
    const textEl = cardDiv.querySelector('p');

    // Compose row: icon in first cell, text in second
    const row = [iconEl, textEl];
    rows.push(row);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
