/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as header
  const headerRow = ['Columns block (columns28)'];

  // Defensive: find the main grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be two columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return;

  // Left column: all content except image
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Compose left column cell content
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

  // Compose right column cell content
  const rightContent = [];
  // Image (should be only one)
  const img = rightCol.tagName === 'IMG' ? rightCol : rightCol.querySelector('img');
  if (img) rightContent.push(img);

  // Build table rows
  const rows = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}