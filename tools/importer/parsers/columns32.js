/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the left column (text) and right column (image)
  const leftCol = grid.children[0];
  const rightCol = grid.children[1];

  // --- Extract logical pieces from left column ---
  // Breadcrumbs
  const breadcrumbs = leftCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');
  // Heading
  const heading = leftCol.querySelector('h2');
  // Author/meta info
  const metaWrap = leftCol.querySelector('.utility-margin-bottom-1rem');
  // Social icons
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');

  // Compose left column cell as an array of elements (preserves order and separation)
  const leftCell = [];
  if (breadcrumbs) leftCell.push(breadcrumbs);
  if (heading) leftCell.push(heading);
  if (metaWrap) leftCell.push(metaWrap);
  if (socialList) leftCell.push(socialList);

  // Compose right column cell (image)
  const imageWrap = grid.children[1];
  const image = imageWrap.querySelector('img');
  const rightCell = image ? [image] : [];

  // Table header row
  const headerRow = ['Columns block (columns32)'];
  // Table content row
  const contentRow = [leftCell, rightCell];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
