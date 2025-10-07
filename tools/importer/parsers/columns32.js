/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // LEFT COLUMN: Collect all relevant content in order
  const leftCol = columns[0];
  const leftContent = [];

  // Breadcrumbs (first .flex-horizontal)
  const breadcrumb = leftCol.querySelector('.flex-horizontal');
  if (breadcrumb) leftContent.push(breadcrumb);

  // Heading (h2)
  const heading = leftCol.querySelector('h2');
  if (heading) leftContent.push(heading);

  // Author/date/read time block
  const metaBlock = leftCol.querySelector('.utility-margin-bottom-1rem');
  if (metaBlock) leftContent.push(metaBlock);

  // Social icons (ul)
  const socialList = leftCol.querySelector('ul[aria-label="Social media links"]');
  if (socialList) leftContent.push(socialList);

  // RIGHT COLUMN: Only the image (reference the actual img element)
  const rightCol = columns[1];
  const image = rightCol.querySelector('img');
  const rightContent = image ? [image] : [];

  // Table structure
  const headerRow = ['Columns (columns32)'];
  const contentRow = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(table);
}
