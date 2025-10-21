/* global WebImporter */
export default function parse(element, { document }) {
  // --- Row 1: Block Header ---
  const headerRow = ['Hero (hero6)'];

  // --- Row 2: Background Image ---
  // Find the background image (should be referenced, not cloned)
  let bgImg = null;
  const gridDivs = element.querySelectorAll('.w-layout-grid');
  for (const grid of gridDivs) {
    const img = grid.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }
  const imageRow = [bgImg ? bgImg : ''];

  // --- Row 3: Content Card ---
  // Find the card containing heading, subheading, and CTA
  let cardContent = null;
  const cardDiv = element.querySelector('.card');
  if (cardDiv) {
    // Compose a fragment for all card content
    const frag = document.createDocumentFragment();
    // Heading (h1)
    const heading = cardDiv.querySelector('h1, .h1-heading');
    if (heading) frag.appendChild(heading);
    // Subheading (p.subheading)
    const subheading = cardDiv.querySelector('p.subheading');
    if (subheading) frag.appendChild(subheading);
    // CTA buttons
    const buttonGroup = cardDiv.querySelector('.button-group');
    if (buttonGroup) frag.appendChild(buttonGroup);
    cardContent = frag;
  }
  const contentRow = [cardContent ? cardContent : ''];

  // --- Compose Table ---
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
