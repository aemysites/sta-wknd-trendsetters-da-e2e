/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns block (columns32)'];

  // Defensive: find the main grid container (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two main columns from the grid
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: text content (breadcrumbs, heading, author, date, social)
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Extract left column content cleanly
  const leftContent = document.createElement('div');

  // Breadcrumbs
  const breadcrumbs = leftCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');
  if (breadcrumbs) leftContent.appendChild(breadcrumbs.cloneNode(true));

  // Heading
  const heading = leftCol.querySelector('h2');
  if (heading) leftContent.appendChild(heading.cloneNode(true));

  // Author/date/read time
  const metaBlocks = leftCol.querySelectorAll('.utility-margin-bottom-1rem > .flex-horizontal');
  metaBlocks.forEach((meta) => leftContent.appendChild(meta.cloneNode(true)));

  // Social icons
  const social = leftCol.querySelector('ul[role="list"]');
  if (social) leftContent.appendChild(social.cloneNode(true));

  // Right column: main image only
  const mainImage = rightCol.querySelector('img');
  let rightContent = null;
  if (mainImage) {
    rightContent = mainImage.cloneNode(true);
  } else {
    rightContent = rightCol.cloneNode(true);
  }

  // Build the table rows
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
