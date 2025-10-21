/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Find the card container (the one with class 'card-body' inside the nested structure)
  // Defensive: support for possible variations in nesting
  let cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // fallback: look for a div with an image and a heading
    cardBody = Array.from(element.querySelectorAll('div')).find(div =>
      div.querySelector('img') && div.querySelector('div, h1, h2, h3, h4, h5, h6')
    );
  }
  if (!cardBody) return;

  // Extract image (mandatory, first column)
  const img = cardBody.querySelector('img');

  // Extract title (heading)
  let title = cardBody.querySelector('div, h1, h2, h3, h4, h5, h6');
  // Defensive: clone the title node to avoid moving it out of the DOM
  let titleNode = null;
  if (title) {
    titleNode = title.cloneNode(true);
  }

  // Description (optional): in this HTML, there is no description, but code is ready for future variations
  let descriptionNode = null;
  // Try to find a paragraph or div after the heading
  if (title && title.nextElementSibling && title.nextElementSibling !== img) {
    descriptionNode = title.nextElementSibling.cloneNode(true);
  }

  // Compose the text cell: title (heading), description (optional)
  const textCellContent = [];
  if (titleNode) textCellContent.push(titleNode);
  if (descriptionNode) textCellContent.push(descriptionNode);

  // Defensive: if no text, fallback to alt text of image
  if (textCellContent.length === 0 && img && img.alt) {
    textCellContent.push(document.createTextNode(img.alt));
  }

  // Build the card row
  rows.push([
    img,
    textCellContent
  ]);

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
