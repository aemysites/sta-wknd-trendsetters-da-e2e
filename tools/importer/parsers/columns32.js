/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children divs of the grid-layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);

  // Defensive: Expecting two columns (left: text, right: image)
  if (columns.length < 2) return;

  // Left column: All text, metadata, breadcrumbs, heading, author, social icons
  const leftCol = columns[0];
  // Right column: Image
  const rightCol = columns[1];

  // --- Build left column content ---
  // Breadcrumbs (Home > Trends)
  const breadcrumbs = leftCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');
  // Heading
  const heading = leftCol.querySelector('h2');
  // Author/date/read time
  const metaWrap = leftCol.querySelector('.utility-margin-bottom-1rem');
  // Social icons
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');

  // Compose left column cell
  const leftCellContent = [];
  if (breadcrumbs) leftCellContent.push(breadcrumbs);
  if (heading) leftCellContent.push(heading);
  if (metaWrap) leftCellContent.push(metaWrap);
  if (socialList) leftCellContent.push(socialList);

  // --- Build right column content ---
  // The image is a direct child of rightCol
  const image = rightCol.querySelector('img');
  const rightCellContent = image ? [image] : [];

  // --- Build table rows ---
  const headerRow = ['Columns block (columns32)'];
  const contentRow = [leftCellContent, rightCellContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace element
  element.replaceWith(table);
}
