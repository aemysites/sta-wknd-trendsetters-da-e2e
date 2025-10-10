/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // LEFT COLUMN: Textual content
  const leftCol = mainGrid.children[0];
  if (!leftCol) return;
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: Images
  const rightCol = mainGrid.children[1];
  if (!rightCol) return;
  const imageGrid = rightCol.querySelector('.w-layout-grid');
  if (!imageGrid) return;
  const images = Array.from(imageGrid.querySelectorAll('img'));
  // Only reference existing image elements (do not clone or create new)
  const rightContent = images;

  // Build table rows
  const headerRow = ['Columns (columns38)'];
  const contentRow = [leftContent, rightContent];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
