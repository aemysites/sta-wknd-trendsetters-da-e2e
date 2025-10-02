/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // 1. Header row: must match target block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row: reference the actual <img> element
  let bgImg = '';
  const img = element.querySelector('img');
  if (img) bgImg = img;

  // 3. Content row: headline, subheading, CTA(s)
  const contentCell = [];
  const card = element.querySelector('.card');
  if (card) {
    // Headline (h1)
    const headline = card.querySelector('h1');
    if (headline) contentCell.push(headline);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // CTA buttons
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      const ctaDiv = document.createElement('div');
      buttonGroup.querySelectorAll('a').forEach((a) => {
        ctaDiv.appendChild(a);
      });
      contentCell.push(ctaDiv);
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [bgImg],
    [contentCell.length ? contentCell : ''],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
