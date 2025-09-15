/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: find the card root (may be nested)
  let cardRoot = element;
  // If the element is a sticky wrapper, descend to the card
  if (cardRoot.classList.contains('utility-position-sticky')) {
    // Find the first child with class 'card'
    cardRoot = cardRoot.querySelector('.card');
  }
  // Defensive: if still not at the card, check for a .card inside
  if (!cardRoot.classList.contains('card')) {
    const found = cardRoot.querySelector('.card');
    if (found) cardRoot = found;
  }

  // Find the card body (where content lives)
  let cardBody = cardRoot.querySelector('.card-body') || cardRoot;

  // Find the image (mandatory)
  const img = cardBody.querySelector('img');

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading, h4, h3, h2, h1');

  // Find description: anything in cardBody that's not the heading or image
  // We'll collect all nodes except the heading and img
  const descriptionNodes = [];
  for (const node of cardBody.childNodes) {
    if (node === img || node === heading) continue;
    // Ignore empty text nodes
    if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) continue;
    descriptionNodes.push(node);
  }

  // Compose the text cell: heading (if any), then description (if any)
  const textCell = [];
  if (heading) textCell.push(heading);
  if (descriptionNodes.length > 0) textCell.push(...descriptionNodes);

  // Build the table rows
  const headerRow = ['Cards (cards21)'];
  const cardRow = [img, textCell];
  const cells = [headerRow, cardRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
