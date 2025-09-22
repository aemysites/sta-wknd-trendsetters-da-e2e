/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid layout
  const topGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!topGrid) return;

  // The grid contains two columns: left (text/buttons), right (images)
  const [leftCol, rightCol] = topGrid.children;
  if (!leftCol || !rightCol) return;

  // LEFT COLUMN: Heading, subheading, buttons
  const leftContent = [];
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // RIGHT COLUMN: Images (in a grid)
  let rightContent = [];
  const imagesGrid = rightCol.querySelector('.w-layout-grid');
  if (imagesGrid) {
    const imgs = Array.from(imagesGrid.querySelectorAll('img'));
    if (imgs.length) {
      rightContent = imgs;
    }
  }

  // Table structure: header, then one row with two columns
  const headerRow = ['Columns block (columns39)'];
  const contentRow = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
