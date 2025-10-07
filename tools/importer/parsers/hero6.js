/* global WebImporter */
export default function parse(element, { document }) {
  // --- Row 2: Background image ---
  // Find the image with a src attribute
  let bgImg = null;
  const img = element.querySelector('img[src]');
  if (img) {
    bgImg = img;
  }

  // --- Row 3: Hero Content ---
  // Find the card overlay with heading, subheading, and buttons
  let heroContent = null;
  const card = element.querySelector('.card');
  if (card) {
    // Create a fragment to hold the hero content
    const frag = document.createDocumentFragment();
    // Heading (h1)
    const heading = card.querySelector('h1');
    if (heading) frag.appendChild(heading);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) frag.appendChild(subheading);
    // CTA buttons
    const buttonGroup = card.querySelector('.button-group');
    if (buttonGroup) frag.appendChild(buttonGroup);
    heroContent = document.createElement('div');
    heroContent.appendChild(frag);
  } else {
    // Defensive fallback: try to find heading, subheading, buttons manually
    const heading = element.querySelector('h1');
    const subheading = element.querySelector('p');
    const buttonGroup = element.querySelector('.button-group');
    heroContent = document.createElement('div');
    if (heading) heroContent.appendChild(heading);
    if (subheading) heroContent.appendChild(subheading);
    if (buttonGroup) heroContent.appendChild(buttonGroup);
  }

  // Table rows
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [heroContent];

  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
