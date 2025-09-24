/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per instructions
  const headerRow = ['Cards (cards24)'];

  // Defensive: Find the card container (may be nested)
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // fallback: try to find the .card-body in descendants
    cardBody = element.querySelector('[class*="card-body"]') || element;
  }

  // Find image (mandatory)
  let img = cardBody.querySelector('img');
  // Defensive: fallback to any img in element
  if (!img) {
    img = element.querySelector('img');
  }

  // Find title (optional)
  let title = cardBody.querySelector('.h4-heading');
  // Defensive: fallback to first heading in cardBody
  if (!title) {
    title = cardBody.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // Compose text cell: title (bold), no description present in this HTML
  const textCell = [];
  if (title) {
    // Make a strong element for the title
    const strong = document.createElement('strong');
    strong.textContent = title.textContent;
    textCell.push(strong);
  }
  // No description or CTA in this HTML

  // Compose the table rows
  const rows = [
    headerRow,
    [img, textCell]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
