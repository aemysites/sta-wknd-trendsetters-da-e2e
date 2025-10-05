/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only process if element exists
  if (!element) return;

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the main image (background)
  let bgImg = null;
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    // Use the first image as background
    bgImg = imgCandidates[0];
  }
  const bgRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  // Find the card with text and buttons
  let contentCell = [];
  // Find the card container
  const card = element.querySelector('.card');
  if (card) {
    // Find heading
    const heading = card.querySelector('h1');
    if (heading) contentCell.push(heading);
    // Find subheading
    const subheading = card.querySelector('p');
    if (subheading) contentCell.push(subheading);
    // Find button group
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      // Only include links (CTA)
      const links = Array.from(buttonGroup.querySelectorAll('a'));
      if (links.length > 0) {
        contentCell = contentCell.concat(links);
      }
    }
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const cells = [
    headerRow,
    bgRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
