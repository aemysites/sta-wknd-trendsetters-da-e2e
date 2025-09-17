/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block name header row
  const headerRow = ['Hero (hero6)'];

  // --- Row 2: Background Image ---
  let bgImg = null;
  // Find the first <img> that is visually the background
  const bgImgEl = element.querySelector('img');
  if (bgImgEl) bgImg = bgImgEl;
  const imageRow = [bgImg ? bgImg : ''];

  // --- Row 3: Content (title, subheading, CTA) ---
  // Find the card containing the text and CTA
  let cardContent = null;
  const cardEl = element.querySelector('.card');
  if (cardEl) cardContent = cardEl;
  // Defensive fallback: if not found, collect all content
  let contentCell;
  if (cardContent) {
    contentCell = cardContent;
  } else {
    // Fallback: collect all headings, paragraphs, and links
    const parts = [];
    element.querySelectorAll('h1, h2, h3, p, a').forEach(el => parts.push(el));
    contentCell = parts.length ? parts : '';
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
