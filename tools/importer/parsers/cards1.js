/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified, exactly one column
  const headerRow = ['Cards (cards1)'];

  // Get all direct child divs (each is a card container)
  const cardDivs = element.querySelectorAll(':scope > div');

  // Prepare card rows
  const rows = [];
  cardDivs.forEach((cardDiv) => {
    // Find the image inside the card div
    const img = cardDiv.querySelector('img');
    // Find the alt text for the image
    const alt = img ? img.getAttribute('alt') : '';
    // Find all text nodes (excluding the image)
    let textContent = '';
    cardDiv.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent;
      }
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'IMG') {
        textContent += node.textContent;
      }
    });
    textContent = textContent.trim();
    // Compose the text cell
    const textCell = document.createElement('div');
    if (alt) {
      const heading = document.createElement('h3');
      heading.textContent = alt;
      textCell.appendChild(heading);
    }
    if (textContent) {
      const desc = document.createElement('p');
      desc.textContent = textContent;
      textCell.appendChild(desc);
    }
    if (img) {
      rows.push([img, textCell]);
    }
  });

  // Build the table data array
  const cells = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
