/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card container
  let cardBody = element;
  // Traverse down to the card-body if necessary
  // The structure is: outer div > inner div > card > card-body
  // We'll find the .card-body inside the element
  const cardBodyDiv = element.querySelector('.card-body') || element;

  // Find the image (mandatory, first cell)
  const img = cardBodyDiv.querySelector('img');

  // Find the heading (title)
  const heading = cardBodyDiv.querySelector('.h4-heading');

  // Compose the text cell: heading (if exists)
  const textContent = [];
  if (heading) {
    textContent.push(heading);
  }
  // No description or CTA in this HTML, so only heading

  // Build the table rows
  const headerRow = ['Cards (cards21)'];
  const cardRow = [img, textContent];
  const cells = [headerRow, cardRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
