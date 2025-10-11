/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the two columns
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Get the two columns
  const columns = Array.from(mainGrid.children);
  if (columns.length < 2) return;

  // Left column: nested grid with content
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Extract left column content
  const leftSection = leftCol.querySelector('.section');
  const leftContent = [];
  if (leftSection) {
    // Heading
    const heading = leftSection.querySelector('h2');
    if (heading) leftContent.push(heading);
    // Paragraph
    const paragraph = leftSection.querySelector('.rich-text, .w-richtext');
    if (paragraph) leftContent.push(paragraph);
    // Button group
    const buttonGroup = leftSection.querySelector('.button-group');
    if (buttonGroup) leftContent.push(buttonGroup);
  }

  // Extract right column image
  let rightContent = null;
  const img = rightCol.tagName === 'IMG' ? rightCol : rightCol.querySelector('img');
  if (img) rightContent = img;

  // Compose table rows
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [leftContent, rightContent];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}
