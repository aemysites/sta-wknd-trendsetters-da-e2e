/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card body containing content
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory for carousel slide)
  const img = cardBody.querySelector('img');

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Prepare the text cell content
  let textCell = '';
  if (heading) {
    // Use a heading element for semantic meaning
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell = h2;
  }

  // Compose the table rows
  const headerRow = ['Carousel (carousel24)'];
  const rows = [headerRow];

  // Only add the slide if there is an image
  if (img) {
    // Reference the existing image element, do not clone
    const slideRow = [img, textCell || ''];
    rows.push(slideRow);
  }

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
