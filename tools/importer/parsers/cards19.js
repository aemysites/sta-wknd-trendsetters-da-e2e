/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all direct card divs (each card is a direct child)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Defensive: Find the icon/image
    let iconImg = null;
    // The icon is always inside a .icon div, which contains an <img>
    const iconDiv = cardDiv.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }

    // Defensive: Find the text content
    // The text is always in a <p> with class utility-margin-bottom-0
    let textContent = null;
    const p = cardDiv.querySelector('p.utility-margin-bottom-0');
    if (p) {
      textContent = p;
    }

    // Build the row: [icon/image, text]
    // If either is missing, fallback to empty string
    rows.push([
      iconImg || '',
      textContent || ''
    ]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
