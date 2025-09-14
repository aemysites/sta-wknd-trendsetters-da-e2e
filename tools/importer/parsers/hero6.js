/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero6)'];

  // --- ROW 2: Background Image ---
  // Find the background image (should be referenced, not cloned)
  let bgImg = '';
  const imgEl = element.querySelector('img.cover-image');
  if (imgEl) bgImg = imgEl;

  // --- ROW 3: Content (Heading, Subheading, CTA) ---
  // Find the card containing text and buttons
  let contentCell = '';
  const cardEl = element.querySelector('.card');
  if (cardEl) {
    const contentParts = [];
    // Heading (h1)
    const heading = cardEl.querySelector('h1');
    if (heading) contentParts.push(heading);
    // Subheading (p.subheading)
    const subheading = cardEl.querySelector('p.subheading');
    if (subheading) contentParts.push(subheading);
    // Button group (all links)
    const buttonGroup = cardEl.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
    contentCell = contentParts;
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImg],
    [contentCell],
  ];

  // Create the table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
