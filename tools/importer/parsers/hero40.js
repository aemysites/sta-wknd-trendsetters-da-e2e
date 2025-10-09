/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the correct header row
  const headerRow = ['Hero (hero40)'];

  // Find background image (first img in the block)
  const bgImg = element.querySelector('img');
  const imageRow = [bgImg ? bgImg.cloneNode(true) : ''];

  // Compose text row: include all text content from headings, paragraphs, buttons, etc.
  // Use less specific selectors to ensure all text is included
  const textCell = document.createElement('div');

  // Find all headings (h1, h2, h3) inside the block
  element.querySelectorAll('h1, h2, h3').forEach((el) => {
    textCell.appendChild(el.cloneNode(true));
  });

  // Find all paragraphs
  element.querySelectorAll('p').forEach((el) => {
    textCell.appendChild(el.cloneNode(true));
  });

  // Find all CTA links/buttons
  element.querySelectorAll('a.button, a.w-button, .button-group a').forEach((el) => {
    textCell.appendChild(el.cloneNode(true));
  });

  // Table rows
  const textRow = [textCell.childNodes.length ? textCell : ''];
  const cells = [headerRow, imageRow, textRow];

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
