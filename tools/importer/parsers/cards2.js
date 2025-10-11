/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing all cards
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Prepare the header row
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Get all direct children of the main grid
  const gridChildren = Array.from(grid.children);

  // The first card is a large feature card (wrapped in an <a>), the rest are inside a nested grid
  const featureCard = gridChildren.find(child => child.tagName === 'A');
  const nestedGrid = gridChildren.find(child => child.classList.contains('w-layout-grid'));

  // Helper to extract card content
  function extractCard(cardAnchor) {
    // Find image (first img inside the card)
    const img = cardAnchor.querySelector('img');
    // Find heading (first h3 inside the card)
    const heading = cardAnchor.querySelector('h2, h3, h4, h5, h6');
    // Find description (first p inside the card)
    const desc = cardAnchor.querySelector('p');
    // Find CTA (button or link inside the card that is not the cardAnchor itself)
    let cta = cardAnchor.querySelector('.button, button, a:not([href="#"])');
    // If not found, check for a div with class 'button'
    if (!cta) cta = cardAnchor.querySelector('div.button');

    // Build text cell content
    const textContent = document.createElement('div');
    if (heading) textContent.appendChild(heading);
    if (desc) textContent.appendChild(desc);
    if (cta) textContent.appendChild(cta);

    return [img, textContent];
  }

  // Add the feature card (large card on the left)
  if (featureCard) {
    rows.push(extractCard(featureCard));
  }

  // Add the smaller cards from the nested grid
  if (nestedGrid) {
    // Each card is an <a> inside the nested grid
    const nestedCards = Array.from(nestedGrid.querySelectorAll(':scope > a'));
    nestedCards.forEach(cardAnchor => {
      rows.push(extractCard(cardAnchor));
    });
  }

  // Replace the original element with the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
