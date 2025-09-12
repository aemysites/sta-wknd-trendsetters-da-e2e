/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card body containing the image and text
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) return;

  // Find the image (mandatory)
  const img = cardBody.querySelector('img');

  // Find the heading (optional)
  const heading = cardBody.querySelector('.h4-heading');

  // Compose the text cell
  let textCell = [];
  if (heading) {
    // Convert heading to <h2> for semantic block
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell.push(h2);
  }
  // If there is other text, add it here (none in this example)

  // If no text, leave cell empty
  if (textCell.length === 0) textCell = [''];

  // Build table rows
  const headerRow = ['Carousel (carousel21)'];
  const slideRow = [img, textCell];
  const cells = [headerRow, slideRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
