/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero20)'];

  // --- Extract background images ---
  // Find the grid-layout with desktop-3-column (contains images)
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  let images = [];
  if (grid) {
    // Get all immediate child .utility-position-relative divs (each contains an image)
    const imgDivs = grid.querySelectorAll(':scope > .utility-position-relative');
    images = Array.from(imgDivs)
      .map(div => div.querySelector('img'))
      .filter(img => img); // Only valid images
  }

  // If there are multiple images, group them in a div for the cell
  let bgCell;
  if (images.length === 1) {
    bgCell = images[0];
  } else if (images.length > 1) {
    const imgContainer = document.createElement('div');
    images.forEach(img => imgContainer.appendChild(img));
    bgCell = imgContainer;
  } else {
    bgCell = '';
  }

  // --- Extract hero text and CTA ---
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let heroContent = [];
  if (contentContainer) {
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) heroContent.push(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) heroContent.push(subheading);
    // CTA buttons
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Only keep anchor tags as CTAs
      const ctas = Array.from(buttonGroup.querySelectorAll('a'));
      if (ctas.length) heroContent.push(...ctas);
    }
  }

  // Compose the hero text cell
  let textCell;
  if (heroContent.length === 1) {
    textCell = heroContent[0];
  } else if (heroContent.length > 1) {
    const textContainer = document.createElement('div');
    heroContent.forEach(el => textContainer.appendChild(el));
    textCell = textContainer;
  } else {
    textCell = '';
  }

  // --- Build table rows ---
  const rows = [
    headerRow,
    [bgCell],
    [textCell]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}
