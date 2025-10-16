/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block parsing
  const headerRow = ['Carousel (carousel24)'];

  const cardBodies = element.querySelectorAll('.card-body');
  const rows = [];

  cardBodies.forEach((cardBody) => {
    // Image (mandatory, first cell)
    const img = cardBody.querySelector('img');
    const imageCell = img ? img : '';

    // Text content (second cell)
    let textCell = '';
    const heading = cardBody.querySelector('.h4-heading');
    if (heading) {
      // Use <div> with class for heading to match original HTML structure
      const h4 = document.createElement('div');
      h4.className = 'h4-heading';
      h4.textContent = heading.textContent;
      textCell = h4;
    }
    rows.push([imageCell, textCell]);
  });

  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
