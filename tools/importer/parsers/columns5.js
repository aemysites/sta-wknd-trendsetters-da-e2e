/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Find the two main columns: left (content), right (image)
  // The left column contains heading, paragraph, buttons; right is the image
  const columns = Array.from(mainGrid.children);
  if (columns.length < 2) return;

  // Identify left (content) and right (image) columns
  const leftCol = columns.find((col) => col.querySelector('h2'));
  const rightCol = columns.find((col) => col.tagName === 'IMG');

  if (!leftCol || !rightCol) return;

  // Extract left column content: heading, paragraph, button group
  const leftContent = [];
  const heading = leftCol.querySelector('h2');
  if (heading) leftContent.push(heading);
  const paragraph = leftCol.querySelector('.rich-text, .w-richtext, p');
  if (paragraph) leftContent.push(paragraph);
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Right column: image element (reference, not clone)
  const rightContent = [rightCol];

  // Table header row must match block name exactly
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [leftContent, rightContent];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original section with the table
  element.replaceWith(table);
}
