/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns32)'];

  // Defensive: Find the main grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Expecting at least two columns

  // Left column: text, breadcrumbs, heading, author/date, social icons
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // --- LEFT COLUMN ---
  // We'll collect all major content blocks from the left column
  const leftContent = [];

  // Breadcrumbs (horizontal flex with links and chevron icon)
  const breadcrumb = leftCol.querySelector('.flex-horizontal');
  if (breadcrumb) leftContent.push(breadcrumb);

  // Heading
  const heading = leftCol.querySelector('h2');
  if (heading) leftContent.push(heading);

  // Author/date/read time block
  const metaBlock = leftCol.querySelector('.utility-margin-bottom-1rem');
  if (metaBlock) leftContent.push(metaBlock);

  // Social icons list
  const socialList = leftCol.querySelector('ul[role="list"]');
  if (socialList) leftContent.push(socialList);

  // --- RIGHT COLUMN ---
  // Find the main image
  const imageBlock = rightCol.querySelector('img');
  // Defensive: If not found, fallback to the whole rightCol
  const rightContent = imageBlock || rightCol;

  // Build the table rows
  const rows = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
