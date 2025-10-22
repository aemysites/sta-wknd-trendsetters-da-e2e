/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns block (columns39)'];

  // Find the two main columns: text (left), images (right)
  // The structure is: header > div.container > div.grid-layout > [textDiv, imagesDiv]
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const [textCol, imagesCol] = grid.children;

  // Defensive: ensure both columns exist
  if (!textCol || !imagesCol) return;

  // --- LEFT COLUMN: Gather all text content and buttons ---
  // We'll include the heading, subheading, and button group as a single cell
  const leftContent = document.createElement('div');
  // Heading
  const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) leftContent.appendChild(heading);
  // Subheading/paragraph
  const subheading = textCol.querySelector('p');
  if (subheading) leftContent.appendChild(subheading);
  // Button group
  const buttonGroup = textCol.querySelector('.button-group');
  if (buttonGroup) leftContent.appendChild(buttonGroup);

  // --- RIGHT COLUMN: Gather all images as a single cell ---
  // The images are inside a nested grid within imagesCol
  const imagesGrid = imagesCol.querySelector('.grid-layout');
  let imageElements = [];
  if (imagesGrid) {
    imageElements = Array.from(imagesGrid.querySelectorAll('img'));
  }
  // Defensive: if not found, try direct children
  if (imageElements.length === 0) {
    imageElements = Array.from(imagesCol.querySelectorAll('img'));
  }
  // Wrap images in a div for layout
  const imagesWrapper = document.createElement('div');
  imageElements.forEach(img => imagesWrapper.appendChild(img));

  // --- Compose the table ---
  // Two columns: left (text/buttons), right (images)
  const contentRow = [leftContent, imagesWrapper];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
