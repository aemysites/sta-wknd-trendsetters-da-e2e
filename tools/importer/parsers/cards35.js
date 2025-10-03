/* global WebImporter */
export default function parse(element, { document }) {
  // Get all card containers (direct children)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // Table header row as required
  const headerRow = ['Cards (cards35)'];
  const rows = [headerRow];

  // For each card, extract the image element and alt text as the title in the second cell
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (img) {
      // Use alt attribute as the card title if present
      const title = img.getAttribute('alt') || '';
      // Use <h3> for heading style if alt text exists
      let textCell = '';
      if (title) {
        const heading = document.createElement('h3');
        heading.textContent = title;
        textCell = heading;
      } else {
        textCell = '';
      }
      // If there is additional text content in the cardDiv, append it below the heading
      // (In this HTML, there is no extra text, but this makes the code flexible)
      const extraTextNodes = Array.from(cardDiv.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim()
      );
      if (extraTextNodes.length > 0) {
        const desc = document.createElement('p');
        desc.textContent = extraTextNodes.map(n => n.textContent.trim()).join(' ');
        if (textCell) {
          textCell = [textCell, desc];
        } else {
          textCell = desc;
        }
      }
      rows.push([img, textCell]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Set header row to span 2 columns
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.children[0].setAttribute('colspan', '2');
  }
  element.replaceWith(table);
}
