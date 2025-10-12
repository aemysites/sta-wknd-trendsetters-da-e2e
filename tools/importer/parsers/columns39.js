/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (columns root)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Left column: headline, subheading, button group
  const leftCol = gridChildren[0];
  const leftColContent = [];
  if (leftCol) {
    // Headline
    const headline = leftCol.querySelector('h1');
    if (headline) leftColContent.push(headline);
    // Subheading
    const subheading = leftCol.querySelector('p');
    if (subheading) leftColContent.push(subheading);
    // Button group
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftColContent.push(buttonGroup);
  }

  // Right column: images (in a grid)
  const rightCol = gridChildren[1];
  let rightColContent = [];
  if (rightCol) {
    // The images are inside a nested grid
    const imageGrid = rightCol.querySelector('.grid-layout');
    if (imageGrid) {
      const imgs = Array.from(imageGrid.querySelectorAll('img')).filter(img => img && img.src);
      rightColContent = imgs;
    }
  }

  // Table header: must match exactly
  const headerRow = ['Columns block (columns39)'];
  // Table content: left column, right column
  const contentRow = [leftColContent, rightColContent];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
