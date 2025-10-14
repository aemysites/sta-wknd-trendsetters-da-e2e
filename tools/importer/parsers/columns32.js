/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column (textual content)
  const leftCol = columns[0];
  // Right column (image)
  const rightCol = columns[1];

  // --- Left column content ---
  // Breadcrumb
  const breadcrumbWrap = leftCol.querySelector('.flex-horizontal');
  // Heading
  const heading = leftCol.querySelector('.h2-heading');
  // Author and meta info
  const metaWrap = leftCol.querySelector('.utility-margin-bottom-1rem');
  // Social icons
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');

  // Compose left column cell: preserve semantic order and all content
  const leftCellContent = [];
  if (breadcrumbWrap) leftCellContent.push(breadcrumbWrap);
  if (heading) leftCellContent.push(heading);
  if (metaWrap) leftCellContent.push(metaWrap);
  if (socialList) leftCellContent.push(socialList);

  // Defensive: If left column is empty, insert empty string
  const leftCell = leftCellContent.length > 0 ? leftCellContent : [''];

  // --- Right column content ---
  // Only reference the actual image element, do not clone or create new
  let image = rightCol.querySelector('img');
  const rightCell = image ? [image] : [''];

  // Table header row: must match block name exactly
  const headerRow = ['Columns block (columns32)'];
  // Second row: left and right columns
  const contentRow = [leftCell, rightCell];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element
  element.replaceWith(table);
}
