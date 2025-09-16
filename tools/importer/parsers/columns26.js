/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Extract left and right columns
  // Left column: heading, avatar/name/title
  // Right column: testimonial, divider, logo svg
  const heading = mainGrid.querySelector('.h2-heading');
  const testimonial = mainGrid.querySelector('.paragraph-lg');
  const avatarRow = mainGrid.querySelector('.flex-horizontal');
  const divider = mainGrid.querySelector('.divider');
  const logoBlock = mainGrid.querySelector('.utility-display-inline-block');

  // Defensive: build left and right column containers
  const leftCol = document.createElement('div');
  if (heading) leftCol.appendChild(heading);
  if (avatarRow) leftCol.appendChild(avatarRow);

  const rightCol = document.createElement('div');
  if (testimonial) rightCol.appendChild(testimonial);
  if (divider) rightCol.appendChild(divider);
  if (logoBlock) rightCol.appendChild(logoBlock);

  // Table header must match target block name exactly
  const headerRow = ['Columns block (columns26)'];
  // Table row: left and right columns
  const contentRow = [leftCol, rightCol];

  // Create table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
