/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN (textual content)
  const leftCol = columns[0];
  const leftCellContent = [];

  // Breadcrumbs
  const breadcrumbs = leftCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');
  if (breadcrumbs) leftCellContent.push(breadcrumbs);

  // Heading
  const heading = leftCol.querySelector('h2');
  if (heading) leftCellContent.push(heading);

  // Author/meta info
  const metaWrapper = leftCol.querySelector('.utility-margin-bottom-1rem');
  if (metaWrapper) leftCellContent.push(metaWrapper);

  // Social icons
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');
  if (socialList) leftCellContent.push(socialList);

  // RIGHT COLUMN (image)
  const rightCol = columns[1];
  const imageCellContent = [];
  if (rightCol) {
    const img = rightCol.querySelector('img');
    if (img) imageCellContent.push(img);
  }

  // Compose table rows
  const headerRow = ['Columns (columns32)'];
  const contentRow = [leftCellContent, imageCellContent];

  // Create columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
