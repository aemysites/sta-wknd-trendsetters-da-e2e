/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter(child => child.matches(selector));
  }

  // Find the main grid-layout div (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main column divs inside the grid
  const columns = getDirectChildren(grid, 'div');
  if (columns.length < 2) return;

  // First column: left side (text)
  const leftCol = columns[0];
  // Second column: right side (image)
  const rightCol = columns[1];

  // --- Left column content ---
  // We'll collect all the relevant content blocks from leftCol
  // Breadcrumbs
  const breadcrumbs = leftCol.querySelector('.flex-horizontal');
  // Heading
  const heading = leftCol.querySelector('h2');
  // Author/date info (utility-margin-bottom-1rem)
  const meta = leftCol.querySelector('.utility-margin-bottom-1rem');
  // Social links
  const socials = leftCol.querySelector('ul[aria-label="Social media links"]');

  // Compose left cell content
  const leftCellContent = [];
  if (breadcrumbs) leftCellContent.push(breadcrumbs);
  if (heading) leftCellContent.push(heading);
  if (meta) leftCellContent.push(meta);
  if (socials) leftCellContent.push(socials);

  // --- Right column content ---
  // Find the main image in the right column
  const rightImgWrapper = rightCol;
  const rightImg = rightImgWrapper.querySelector('img');
  const rightCellContent = [];
  if (rightImg) rightCellContent.push(rightImg);

  // Table structure
  // Header row: block name
  const headerRow = ['Columns block (columns32)'];
  // Second row: left and right columns
  const secondRow = [leftCellContent, rightCellContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
