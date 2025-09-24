/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children by tag
  function getDirectChild(parent, selector) {
    return Array.from(parent.children).find(el => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row (optional)
  let bgImg = null;
  // Find the image inside the first grid cell
  const gridDivs = element.querySelectorAll(':scope > div > div');
  if (gridDivs.length > 0) {
    const firstGridCell = gridDivs[0];
    bgImg = firstGridCell.querySelector('img');
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row: title, subheading, CTA
  // Find the card div containing text and buttons
  let contentCell = document.createElement('div');
  let cardDiv = null;
  if (gridDivs.length > 1) {
    // The second grid cell contains the card
    const secondGridCell = gridDivs[1];
    cardDiv = secondGridCell.querySelector('.card');
  }
  if (cardDiv) {
    // Extract heading, subheading, and button group
    const heading = cardDiv.querySelector('h1');
    const subheading = cardDiv.querySelector('p');
    const buttonGroup = cardDiv.querySelector('.button-group');
    if (heading) contentCell.appendChild(heading);
    if (subheading) contentCell.appendChild(subheading);
    if (buttonGroup) contentCell.appendChild(buttonGroup);
  }
  const contentRow = [contentCell];

  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
