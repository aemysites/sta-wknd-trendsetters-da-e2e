/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Defensive: Expecting two columns (image, content)
  let imageEl = null;
  let contentEl = null;
  if (gridChildren.length >= 2) {
    // Reference the actual elements, do not clone
    imageEl = gridChildren[0];
    contentEl = gridChildren[1];
  } else {
    // Fallback: Try to find image and content manually
    imageEl = grid.querySelector('img');
    contentEl = grid.querySelector('div');
  }

  // Ensure imageEl and contentEl are present
  if (!imageEl || !contentEl) return;

  // --- COLUMN 1: IMAGE ---
  // Reference the image element directly (do not create new)
  // No alt text or src should be hardcoded

  // --- COLUMN 2: CONTENT ---
  // The content column contains:
  //   - Heading (h1)
  //   - Subheading (p)
  //   - Button group (div.button-group with <a> children)
  // All content is already present in contentEl
  // Do not create new elements, reference original

  // Block header must match target block name exactly
  const headerRow = ['Columns (columns3)'];

  // Block columns row: reference actual elements
  const columnsRow = [imageEl, contentEl];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow,
  ], document);

  // Replace the original element with the block
  element.replaceWith(table);
}
