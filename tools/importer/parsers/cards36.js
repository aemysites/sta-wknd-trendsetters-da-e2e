/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name and variant as the first row
  const headerRow = ['Cards (cards36)']; // exactly one column in header row

  // Get all direct child divs (each is a card container)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Build the rows for the table
  const rows = [headerRow];

  cardDivs.forEach((cardDiv) => {
    // Each cardDiv contains an image (mandatory)
    const img = cardDiv.querySelector('img');
    if (!img) return;

    // Try to get all text content from the cardDiv, not just the image alt
    let textContent = '';
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent.trim() + ' ';
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        textContent += node.textContent.trim() + ' ';
      }
    });
    textContent = textContent.trim();

    // Fallback to image alt if no other text is found
    if (!textContent) {
      textContent = img.getAttribute('alt')?.trim() || '';
    }

    let textCell;
    if (textContent) {
      const heading = document.createElement('p');
      heading.innerHTML = `<strong>${textContent}</strong>`;
      textCell = heading;
    } else {
      textCell = '';
    }
    rows.push([img, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
