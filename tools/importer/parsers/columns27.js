/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const mainContainer = element.querySelector('.container');
  if (!mainContainer) return;

  // Find the main grid layout
  const grid = mainContainer.querySelector('.grid-layout');
  if (!grid) return;

  // Extract left column: heading + testimonial block
  const heading = grid.querySelector('.h2-heading');
  // Testimonial block (avatar, name, title)
  let testimonialBlock = null;
  const subGrid = grid.querySelector('.w-layout-grid.grid-layout.w-node-_3ef8ef40-2915-728f-b826-c7b8d23344dd-34b92918');
  if (subGrid) {
    testimonialBlock = document.createElement('div');
    // Avatar and name/title
    const flex = subGrid.querySelector('.flex-horizontal');
    if (flex) testimonialBlock.appendChild(flex);
  }

  // Left column: heading and testimonial
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (testimonialBlock && testimonialBlock.childNodes.length) leftCol.appendChild(testimonialBlock);

  // Extract right column: quote paragraph + logo
  const paragraph = grid.querySelector('.paragraph-lg');
  // Logo (SVG image)
  let logoBlock = null;
  if (subGrid) {
    const logoDiv = subGrid.querySelector('.utility-display-inline-block');
    if (logoDiv) {
      logoBlock = document.createElement('div');
      logoBlock.appendChild(logoDiv);
    }
  }
  const rightCol = document.createElement('div');
  if (paragraph) rightCol.appendChild(paragraph);
  if (logoBlock && logoBlock.childNodes.length) rightCol.appendChild(logoBlock);

  // Build table rows
  const headerRow = ['Columns block (columns27)'];
  const contentRow = [leftCol, rightCol];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
