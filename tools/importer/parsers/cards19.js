/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: ensure element exists
  if (!element || !document) return;

  // Table header row as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Each card is a direct child div of the grid container
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Defensive: find the icon (svg inside .icon) and the text (p)
    let iconEl = null;
    let textEl = null;

    // Find the icon (svg inside .icon)
    const iconWrapper = cardDiv.querySelector('.icon');
    if (iconWrapper) {
      // Use the icon wrapper div (contains svg)
      iconEl = iconWrapper;
    }

    // Find the text paragraph
    textEl = cardDiv.querySelector('p');

    // Defensive: only add if both icon and text exist
    if (iconEl && textEl) {
      rows.push([iconEl, textEl]);
    }
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
