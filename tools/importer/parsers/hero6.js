/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: always block name
  const headerRow = ['Hero (hero6)'];

  // 2. Background image: find the main image in the hero
  let bgImg = element.querySelector('img');
  // Defensive: if not found, try to find any image
  if (!bgImg) {
    bgImg = element.querySelector('img');
  }

  // 3. Content: find the card overlay with heading, subheading, and CTA(s)
  // The card is nested inside several divs, but has class 'card'
  const card = element.querySelector('.card');

  // Defensive: extract heading, subheading, and button group
  let heading = null;
  let subheading = null;
  let buttons = [];

  if (card) {
    heading = card.querySelector('h1');
    subheading = card.querySelector('p');
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) {
      buttons = Array.from(buttonGroup.querySelectorAll('a'));
    }
  }

  // Compose content cell: heading, subheading, buttons
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (buttons.length) contentCell.push(...buttons);

  // Build table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell]
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(block);
}
