/* global WebImporter */
export default function parse(element, { document }) {
  // --- Row 1: Header ---
  const headerRow = ['Hero (hero6)'];

  // --- Row 2: Background Image ---
  let bgImg = '';
  const img = element.querySelector('img');
  if (img) bgImg = img;

  // --- Row 3: Content (Heading, Subheading, CTA) ---
  // Find the card containing all text and buttons
  let contentCell = '';
  const card = element.querySelector('.card');
  if (card) {
    // Clone the card so we get all its content (heading, subheading, buttons)
    contentCell = card.cloneNode(true);
  }

  // Build table rows
  const cells = [
    headerRow,
    [bgImg],
    [contentCell],
  ];

  // Replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
