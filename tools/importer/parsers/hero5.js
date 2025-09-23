/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const gridContainer = element.querySelector('.grid-layout.container');
  // Find the hero content block (with heading, paragraph, buttons)
  const contentBlock = gridContainer ? gridContainer.querySelector('.section') : null;
  // Find the image (should be direct child of gridContainer)
  const imageEl = gridContainer ? gridContainer.querySelector('img') : null;

  // Compose the content cell
  const contentCell = [];
  if (contentBlock) {
    // Heading (h2)
    const heading = contentBlock.querySelector('h2');
    if (heading) contentCell.push(heading);
    // Paragraph (rich text)
    const paragraph = contentBlock.querySelector('.rich-text, .w-richtext, p');
    if (paragraph) contentCell.push(paragraph);
    // Button group
    const buttonGroup = contentBlock.querySelector('.button-group');
    if (buttonGroup) contentCell.push(buttonGroup);
  }

  // Table rows
  const headerRow = ['Hero (hero5)'];
  const imageRow = [imageEl ? imageEl : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  element.replaceWith(table);
}
