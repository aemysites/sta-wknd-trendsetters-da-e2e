/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Find the card body (where content lives)
  const cardBody = element.querySelector('.card-body');

  // Defensive: Get the image (mandatory for carousel slide)
  const img = cardBody ? cardBody.querySelector('img') : null;

  // Defensive: Get the heading (optional)
  const heading = cardBody ? cardBody.querySelector('.h4-heading') : null;

  // Compose the text cell contents
  const textCell = [];
  if (heading) {
    // Create a heading element (h2 for carousel block)
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent;
    textCell.push(h2);
  }
  // No description or CTA present in source HTML

  // Build table rows
  const headerRow = ['Carousel (carousel24)'];
  const rows = [headerRow];
  // Only one slide in this HTML
  if (img) {
    rows.push([
      img,
      textCell.length ? textCell : ''
    ]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
