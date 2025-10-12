/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns28)'];

  // Defensive: Find the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children of the grid (should be two: left column, right column)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: all text and button
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Compose left column content as an array of elements (preserves order)
  const leftContent = [];
  // Eyebrow
  const eyebrow = leftCol.querySelector('.eyebrow');
  if (eyebrow) leftContent.push(eyebrow);
  // Heading
  const heading = leftCol.querySelector('.h1-heading');
  if (heading) leftContent.push(heading);
  // Main paragraph
  const mainPara = leftCol.querySelector('.paragraph-xxl');
  if (mainPara) leftContent.push(mainPara);
  // Secondary text
  const secondaryText = leftCol.querySelector('.utility-text-secondary');
  if (secondaryText) leftContent.push(secondaryText);
  // Button
  const button = leftCol.querySelector('.button');
  if (button) leftContent.push(button);

  // Right column: image (use the actual <img> element)
  const img = rightCol.tagName === 'IMG' ? rightCol : rightCol.querySelector('img');
  const rightContent = img ? [img] : [];

  // Build the table rows
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
