/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout (the columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the three main children of the grid
  const gridChildren = Array.from(grid.children);

  // Defensive: ensure we have at least three children
  if (gridChildren.length < 3) return;

  // Left feature column (first child)
  const leftFeature = gridChildren[0];

  // Right top cards (second child)
  const rightTop = gridChildren[1];

  // Right bottom list (third child)
  const rightBottom = gridChildren[2];

  // Compose left column content: leftFeature
  // Use the existing element reference

  // Compose right column content:
  // Gather all .utility-link-content-block children from rightTop and rightBottom
  let rightColumnContent = [];
  if (rightTop) {
    rightColumnContent = rightColumnContent.concat(
      Array.from(rightTop.querySelectorAll(':scope > a.utility-link-content-block'))
    );
  }
  if (rightBottom) {
    rightColumnContent = rightColumnContent.concat(
      Array.from(rightBottom.querySelectorAll(':scope > a.utility-link-content-block'))
    );
  }

  // Edge case: if no right column content, fill with empty cell
  if (rightColumnContent.length === 0) {
    rightColumnContent = [''];
  }

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns37)'];
  // Table second row: left column, right column (all right cards grouped)
  const contentRow = [leftFeature, rightColumnContent];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
