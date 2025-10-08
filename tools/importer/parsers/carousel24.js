/* global WebImporter */
export default function parse(element, { document }) {
  // Critical fix: Ensure all text content from the original HTML is included in the output.
  // The heading 'Beach vibes, sun-kissed style' is present in the HTML and must be in the second cell.

  const headerRow = ['Carousel (carousel24)'];
  const rows = [headerRow];

  // Find all card-body elements (each is a slide)
  const cardBodies = element.querySelectorAll('.card-body');
  cardBodies.forEach(cardBody => {
    // Image: mandatory, first cell
    const img = cardBody.querySelector('img');
    const imgCell = img ? img : '';

    // Second cell: include heading text if present
    let textCell = '';
    const heading = cardBody.querySelector('.h4-heading');
    if (heading) {
      // Use the heading element itself for proper formatting
      textCell = heading;
    }

    rows.push([imgCell, textCell]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
