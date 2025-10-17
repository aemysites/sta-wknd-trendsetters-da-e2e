/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that contains the two columns
  const mainGrid = element.querySelector('.grid-layout.container');
  let leftCol = null;
  let rightColImg = null;

  if (mainGrid) {
    // The left column is a div, the right column is an img sibling
    const children = Array.from(mainGrid.parentElement.children);
    children.forEach((child) => {
      if (child.classList && child.classList.contains('grid-layout')) {
        leftCol = child;
      } else if (child.tagName === 'IMG') {
        rightColImg = child;
      }
    });
  }

  // Extract left column content: heading, paragraph, buttons
  let leftColCell = [];
  if (leftCol) {
    // The actual content is in the first child of leftCol
    const contentDiv = leftCol.querySelector(':scope > div');
    if (contentDiv) {
      // Heading
      const heading = contentDiv.querySelector('h2, h1, h3, h4, h5, h6');
      if (heading) leftColCell.push(heading);
      // Paragraph
      const richText = contentDiv.querySelector('.rich-text, .w-richtext, p');
      if (richText) leftColCell.push(richText);
      // Buttons
      const buttonGroup = contentDiv.querySelector('.button-group');
      if (buttonGroup) leftColCell.push(buttonGroup);
    }
  }

  // Extract right column image
  let rightColCell = [];
  if (rightColImg) {
    rightColCell.push(rightColImg);
  }

  // Build the columns block table
  const headerRow = ['Columns block (columns5)'];
  const contentRow = [leftColCell, rightColCell];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
