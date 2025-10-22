/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children divs
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns (left: text, right: image)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 2) return;

  // Left column: all text and social icons
  const leftCol = gridChildren[0];
  // Right column: image
  const rightCol = gridChildren[1] || gridChildren[0].nextElementSibling;

  // --- Left Column Content ---
  // Breadcrumbs (Home > Trends)
  const breadcrumbs = leftCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');

  // Heading
  const heading = leftCol.querySelector('h2');

  // Author/date/read time
  const metaBlock = leftCol.querySelector('.utility-margin-bottom-1rem');

  // Social icons (ul)
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');

  // Compose left column cell
  const leftCellContent = [];
  if (breadcrumbs) leftCellContent.push(breadcrumbs);
  if (heading) leftCellContent.push(heading);
  if (metaBlock) leftCellContent.push(metaBlock);
  if (socialList) leftCellContent.push(socialList);

  // --- Right Column Content ---
  // Image
  let imageCell = null;
  if (rightCol) {
    const img = rightCol.querySelector('img');
    if (img) imageCell = img;
  }

  // Table structure: header, then columns
  const headerRow = ['Columns (columns32)'];
  const columnsRow = [leftCellContent, imageCell].filter(Boolean);

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
