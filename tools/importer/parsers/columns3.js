/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the columns block
  const headerRow = ['Columns block (columns3)'];

  // Find the grid container (should be the direct child of .container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the two columns: first is image, second is content
  const columns = Array.from(grid.children);
  // Defensive: Expecting at least 2 columns
  if (columns.length < 2) return;

  // First column: image (reference the existing image element)
  const imgCol = columns.find((el) => el.tagName === 'IMG');
  // Second column: content (heading, subheading, buttons)
  const contentCol = columns.find((el) => el.tagName !== 'IMG');

  // Defensive: Ensure both columns exist
  if (!imgCol || !contentCol) return;

  // ---
  // Build the content cell for the right column, preserving semantic structure
  // Reference the actual elements from the DOM, not clones or new elements
  const contentCell = document.createElement('div');
  // Heading
  const heading = contentCol.querySelector('h1');
  if (heading) contentCell.appendChild(heading);
  // Subheading/paragraph
  const subheading = contentCol.querySelector('p');
  if (subheading) contentCell.appendChild(subheading);
  // Button group
  const btnGroup = contentCol.querySelector('.button-group');
  if (btnGroup) {
    // Reference the actual button group element
    contentCell.appendChild(btnGroup);
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [imgCol, contentCell],
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
