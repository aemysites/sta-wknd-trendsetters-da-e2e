/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct child by class
  function getDirectChildByClass(parent, className) {
    return Array.from(parent.children).find((child) => child.classList.contains(className));
  }

  // Find the card root (may be nested)
  let cardRoot = element;
  // Step down through wrappers to find the card content
  // The structure is: element > ... > card > card-body
  let card = cardRoot.querySelector('.card');
  if (!card) {
    card = getDirectChildByClass(cardRoot, 'card');
  }
  let cardBody = card ? card.querySelector('.card-body') : null;
  if (!cardBody) {
    cardBody = card ? getDirectChildByClass(card, 'card-body') : null;
  }
  if (!cardBody) {
    // fallback: just use the deepest div
    cardBody = cardRoot.querySelector('div');
  }

  // Extract image (mandatory)
  let image = cardBody ? cardBody.querySelector('img') : null;
  // Defensive: if not found, search deeper
  if (!image) {
    image = cardRoot.querySelector('img');
  }

  // Extract title (optional)
  let title = cardBody ? cardBody.querySelector('.h4-heading') : null;
  // Defensive: if not found, search for h4/h3/h2/h1
  if (!title) {
    title = cardBody ? cardBody.querySelector('h1,h2,h3,h4') : null;
  }

  // Compose text cell: title + description (if any)
  const textCell = [];
  if (title) {
    textCell.push(title);
  }
  // Description: any text nodes or elements after the title and not the image
  if (cardBody) {
    // Get all children except title and image
    Array.from(cardBody.childNodes).forEach((node) => {
      if (node === title || node === image) return;
      // Only add if not empty
      if (node.nodeType === Node.ELEMENT_NODE) {
        // skip empty divs
        if (node.textContent.trim()) {
          textCell.push(node);
        }
      } else if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.trim()) {
          // Wrap in <p>
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textCell.push(p);
        }
      }
    });
  }

  // Build table rows
  const headerRow = ['Cards (cards24)'];
  const cardRow = [image, textCell];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cardRow,
  ], document);

  element.replaceWith(table);
}
