/* global WebImporter */
export default function parse(element, { document }) {
  if (!element || !element.classList.contains('grid-layout')) return;

  // Header row: single column with block name
  const headerRow = ['Cards (cards7)'];
  const rows = [headerRow];

  // Each card is a direct child div
  const cardDivs = element.querySelectorAll(':scope > div');
  cardDivs.forEach((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (!img) return;
    // Compose text content: alt text only, as there is no other text in the HTML
    const alt = img.getAttribute('alt') || '';
    if (!alt.trim()) return;
    // Each row: [img, alt text]
    rows.push([img, alt.trim()]);
  });

  // Ensure header row has two columns for consistency
  if (rows.length > 1 && headerRow.length === 1) {
    rows[0].push('');
  }

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
