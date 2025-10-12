/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block: 2 columns, 1 row per slide, header row first

  // Header row as required
  const headerRow = ['Carousel (carousel24)'];

  // Find the card body (contains heading and image)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory, first column)
  const img = cardBody.querySelector('img');

  // Find the heading (optional, second column)
  const heading = cardBody.querySelector('.h4-heading');

  // Prepare text content cell (second column)
  let textCell = '';
  if (heading) {
    // Use a heading element for semantic structure
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell = h2;
  }

  // Build the slide row
  const slideRow = [img, textCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    slideRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
