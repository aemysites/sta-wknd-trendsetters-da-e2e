/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children: image and content div
  const children = Array.from(grid.children);
  const img = children.find((el) => el.tagName === 'IMG');
  const contentDiv = children.find((el) => el !== img);

  // Defensive: Ensure both columns exist
  if (!img || !contentDiv) return;

  // Header row must match exactly
  const headerRow = ['Columns block (columns3)'];

  // Second row: left column (image), right column (content)
  // Use the image element directly
  // For the right column, include all content inside the contentDiv
  const rightColumn = Array.from(contentDiv.childNodes);

  // Table rows
  const rows = [headerRow, [img, rightColumn]];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(table);
}
