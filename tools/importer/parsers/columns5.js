/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing the columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Find the two columns: left (text/buttons), right (image)
  // Left column: nested grid with heading, paragraph, button group
  const leftCol = mainGrid.querySelector('.container');
  let leftContent = [];
  if (leftCol) {
    // Heading
    const heading = leftCol.querySelector('h2, h1, h3, h4, h5, h6');
    if (heading) leftContent.push(heading);
    // Rich text paragraph (must preserve the div with the p inside)
    const richTextDiv = leftCol.querySelector('.rich-text, .w-richtext');
    if (richTextDiv) leftContent.push(richTextDiv);
    // Button group
    const buttonGroup = leftCol.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  }

  // Right column: image (reference the actual DOM element, do not clone)
  const img = mainGrid.querySelector('img');

  // Table header row must match the block name exactly
  const headerRow = ['Columns block (columns5)'];
  // Table content row: left column (text/buttons), right column (image)
  const contentRow = [leftContent, img].filter(Boolean);
  while (contentRow.length < 2) contentRow.push('');

  // Build the columns table
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
