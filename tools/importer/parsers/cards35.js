/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required: exactly one column
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // Get all direct child divs (each is a card image wrapper)
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    if (!img) return; // Defensive: skip if no image

    // Build the text cell (no text in source, so only heading from alt)
    const textCell = document.createElement('div');
    if (img.alt && img.alt.trim()) {
      const heading = document.createElement('h3');
      heading.textContent = img.alt;
      textCell.appendChild(heading);
    } else {
      textCell.textContent = '[No description]';
    }

    // Add row: [image, text content]
    rows.push([img, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Fix: set colspan=2 on the header cell for correct table structure
  const headerTh = table.querySelector('thead tr th');
  if (headerTh) headerTh.setAttribute('colspan', '2');
  element.replaceWith(table);
}
