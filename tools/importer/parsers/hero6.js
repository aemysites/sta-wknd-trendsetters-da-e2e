/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: Must use target block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Background image: reference the actual <img> element from the DOM
  const bgImg = element.querySelector('img');
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content extraction: heading, subheading, CTA(s)
  // Locate the card overlay
  const card = element.querySelector('.card');
  const contentParts = [];
  if (card) {
    // Heading (h1)
    const heading = card.querySelector('h1');
    if (heading) contentParts.push(heading);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) contentParts.push(subheading);
    // CTA buttons (all <a> inside .button-group)
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
  }
  // Ensure all text content is included, and preserve semantic structure
  const contentRow = [contentParts];

  // Build the table using WebImporter.DOMUtils.createTable
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
