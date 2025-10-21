/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main grid containing columns
  const grid = element.querySelector('.grid-layout.container');

  // Defensive: If grid not found, fallback to first grid-layout
  const columns = grid ? Array.from(grid.children) : Array.from(element.querySelectorAll(':scope > div'));

  // Find the image (outside the inner grid)
  const image = element.querySelector('img');

  // Left column: Heading, paragraph, buttons
  let leftColContent = [];
  if (columns.length) {
    const leftSection = columns[0];
    // Heading
    const heading = leftSection.querySelector('h2');
    if (heading) leftColContent.push(heading);
    // Paragraph (rich text)
    const paragraph = leftSection.querySelector('.rich-text, .w-richtext, p');
    if (paragraph) leftColContent.push(paragraph);
    // Buttons
    const buttonGroup = leftSection.querySelector('.button-group');
    if (buttonGroup) leftColContent.push(buttonGroup);
  }

  // Right column: Image
  let rightColContent = image ? [image] : [];

  // Table header: Must match block name exactly
  const headerRow = ['Columns (columns5)'];
  // Table content row: left column (text/buttons), right column (image)
  const contentRow = [leftColContent, rightColContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
