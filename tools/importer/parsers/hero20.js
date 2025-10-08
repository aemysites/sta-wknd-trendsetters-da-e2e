/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row for Hero (hero20)
  const headerRow = ['Hero (hero20)'];

  // --- Extract background images ---
  // Find the grid-layout with desktop-3-column (the collage)
  const collageGrid = element.querySelector('.desktop-3-column');
  let backgroundImages = [];
  if (collageGrid) {
    // Get all images in the collage
    backgroundImages = Array.from(collageGrid.querySelectorAll('img'));
  }
  const collageCell = backgroundImages.length > 0 ? backgroundImages : [''];

  // --- Extract hero text and CTAs ---
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');

  // Compose all text and CTAs into a single cell
  const textCtaCell = [];
  if (contentContainer) {
    const heading = contentContainer.querySelector('h1');
    if (heading) textCtaCell.push(heading);
    const subheading = contentContainer.querySelector('p');
    if (subheading) textCtaCell.push(subheading);
    const ctaGroup = contentContainer.querySelector('.button-group');
    if (ctaGroup) textCtaCell.push(ctaGroup);
  }
  const textCtaRow = [textCtaCell.length > 0 ? textCtaCell : ['']];

  // Compose table rows: 1 column, 3 rows
  const rows = [
    headerRow,
    [collageCell],
    [textCtaCell.length > 0 ? textCtaCell : ['']]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
