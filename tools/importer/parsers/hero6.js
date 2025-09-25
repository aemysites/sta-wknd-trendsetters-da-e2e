/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the first <img> inside the element (background image)
  let bgImg = element.querySelector('img');
  let bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row: title, subheading, CTA
  // Find the card with the text and CTAs
  let card = element.querySelector('.card');
  let contentParts = [];
  if (card) {
    // Heading (preserve heading level)
    const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentParts.push(heading);
    // Subheading (paragraph)
    const subheading = card.querySelector('p.subheading');
    if (subheading) contentParts.push(subheading);
    // CTA(s) (button group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
  }
  // Defensive: if no content, cell is empty string
  const contentCell = [contentParts.length ? contentParts : ''];

  // Compose the table
  const tableCells = [
    headerRow,
    bgImgRow,
    contentCell,
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
