/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout containing two columns
  const grid = element.querySelector('.grid-layout.tablet-1-column');
  if (!grid) return;

  // Identify left and right columns
  const leftCol = grid.children[0];
  const rightCol = grid.children[1];

  // --- LEFT COLUMN: Collect all text and button content ---
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading
  const subheading = leftCol.querySelector('.subheading');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // --- RIGHT COLUMN: Collect all images ---
  const rightContent = [];
  // Find the image grid inside rightCol
  const imageGrid = rightCol.querySelector('.grid-layout.utility-height-100');
  if (imageGrid) {
    imageGrid.querySelectorAll('img').forEach(img => {
      rightContent.push(img);
    });
  }

  // --- Build Columns Table ---
  const headerRow = ['Columns (columns38)']; // CRITICAL: Use block name exactly
  const contentRow = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element
  element.replaceWith(table);
}
