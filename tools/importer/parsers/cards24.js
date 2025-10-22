/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block: expects a table with header row and one row per card (image, text)
  // The source HTML has a single card structure

  // Helper: Get the card container
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Extract image (mandatory)
  const img = cardBody.querySelector('img');

  // Extract title (optional, styled as heading)
  const title = cardBody.querySelector('.h4-heading');

  // Extract description (optional)
  // For this HTML, there is no description element, but check for extra text nodes
  let description = null;
  // Defensive: If there are more children, grab text nodes after heading and before image
  const children = Array.from(cardBody.childNodes);
  if (children.length > 2) {
    // Find text nodes between title and image
    const titleIdx = children.indexOf(title);
    const imgIdx = children.indexOf(img);
    if (titleIdx !== -1 && imgIdx !== -1 && imgIdx > titleIdx + 1) {
      description = document.createElement('div');
      for (let i = titleIdx + 1; i < imgIdx; i++) {
        if (children[i].nodeType === Node.TEXT_NODE && children[i].textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = children[i].textContent.trim();
          description.appendChild(p);
        } else if (children[i].nodeType === Node.ELEMENT_NODE) {
          description.appendChild(children[i]);
        }
      }
    }
  }

  // Compose text cell: title (heading), then description if present
  const textCell = [];
  if (title) textCell.push(title);
  if (description && description.childNodes.length) textCell.push(description);

  // Table rows
  const headerRow = ['Cards (cards24)'];
  const cardRow = [img, textCell.length ? textCell : ''];

  const cells = [headerRow, cardRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
