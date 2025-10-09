/* global WebImporter */
export default function parse(element, { document }) {
  // Columns block (columns21) parser for footer grid
  // Defensive: Only parse if grid layout is present
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all top-level columns in the grid
  // Each column is either a div (logo/socials) or a ul (section)
  // The first column is a div (logo + social icons)
  // The next three columns are ul lists (each with a heading and links)
  const columns = [];
  const gridChildren = Array.from(grid.children);

  // First column: logo + social icons
  const firstCol = gridChildren[0];
  if (firstCol) {
    // Remove unnecessary <br> from Instagram label for consistency
    const instagramLabel = firstCol.querySelector('.utility-screen-reader-visible-only');
    if (instagramLabel && instagramLabel.innerHTML.includes('Instagram')) {
      instagramLabel.innerHTML = instagramLabel.innerHTML.replace(/<br\s*\/?>/gi, '');
    }
    columns.push(firstCol);
  }

  // Next columns: ul lists (section headings + links)
  for (let i = 1; i < gridChildren.length; i++) {
    const col = gridChildren[i];
    columns.push(col);
  }

  // Table header row (block name)
  const headerRow = ['Columns block (columns21)'];
  // Table second row: each column's content
  const contentRow = columns;

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
