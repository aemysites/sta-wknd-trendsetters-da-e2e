/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout container (the columns wrapper)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two column elements
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // Left column: text content
  const leftCol = cols[0];
  // Right column: image content
  const rightCol = cols[1];

  // --- LEFT COLUMN ---
  // We'll collect all left column content in order
  const leftFragment = document.createDocumentFragment();

  // Breadcrumbs (first .flex-horizontal.flex-gap-xxs.y-center)
  const breadcrumbs = leftCol.querySelector('.flex-horizontal.flex-gap-xxs.y-center');
  if (breadcrumbs) leftFragment.appendChild(breadcrumbs);

  // Heading (h2)
  const heading = leftCol.querySelector('h2');
  if (heading) leftFragment.appendChild(heading);

  // Author/date/meta info (first .utility-margin-bottom-1rem)
  const meta = leftCol.querySelector('.utility-margin-bottom-1rem');
  if (meta) leftFragment.appendChild(meta);

  // Social links (ul[aria-label="Social media links"])
  const social = leftCol.querySelector('ul[aria-label="Social media links"]');
  if (social) leftFragment.appendChild(social);

  // --- RIGHT COLUMN ---
  // Find the image in the right column
  const image = rightCol.querySelector('img');
  // Defensive: fallback to any img in rightCol
  const rightImage = image || rightCol.querySelector('img');

  // --- TABLE STRUCTURE ---
  // Header row: must match block name exactly
  const headerRow = ['Columns block (columns32)'];
  // Second row: left content, right image (reference the image element directly)
  const contentRow = [leftFragment, rightImage || ''];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
