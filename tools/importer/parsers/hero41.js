/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with block name
  const headerRow = ['Hero (hero41)'];

  // 2. Extract background image (first image in hero block)
  const bgImg = element.querySelector('img');
  // Defensive: If not found, leave cell empty
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Extract text content and CTA
  // Find main heading (h1)
  const heading = element.querySelector('h1');

  // Find subheading (paragraph)
  let subheading = null;
  const paragraphs = element.querySelectorAll('p');
  if (paragraphs.length > 0) {
    subheading = paragraphs[0];
  }

  // Find CTA (anchor inside button group)
  let cta = null;
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup) {
    cta = buttonGroup.querySelector('a');
  }

  // Compose the content cell
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  const contentRow = [contentCell];

  // 4. Create the block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace the original element with the new block table
  element.replaceWith(block);
}
