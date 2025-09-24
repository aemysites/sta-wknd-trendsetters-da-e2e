/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (should be two columns)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // First column: all text, headings, lists, links, social icons
  const firstCol = cols[0];
  // Second column: image
  const secondCol = cols[1];

  // Compose first column content
  const firstColContent = document.createElement('div');
  // Breadcrumbs
  const breadcrumbs = firstCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');
  if (breadcrumbs) firstColContent.appendChild(breadcrumbs);
  // Heading
  const heading = firstCol.querySelector('h2');
  if (heading) firstColContent.appendChild(heading);
  // Author/date/read time
  const meta = firstCol.querySelector('.utility-margin-bottom-1rem');
  if (meta) firstColContent.appendChild(meta);
  // Social icons
  const socials = firstCol.querySelector('ul[role="list"]');
  if (socials) firstColContent.appendChild(socials);

  // Compose second column content
  const secondColContent = document.createElement('div');
  const img = secondCol.querySelector('img');
  if (img) secondColContent.appendChild(img);

  // Table header row
  const headerRow = ['Columns (columns32)'];
  // Table content row
  const contentRow = [firstColContent, secondColContent];

  // Create table block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
