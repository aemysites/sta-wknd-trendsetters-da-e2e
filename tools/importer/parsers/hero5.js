/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero5)'];

  // Extract the main image (background image for hero)
  const imageEl = element.querySelector('img');

  // Extract heading, paragraph, and CTA buttons as plain elements
  let heading = '';
  let subheading = '';
  const ctas = [];

  // Heading
  const h2 = element.querySelector('h2');
  if (h2) {
    heading = h2.cloneNode(true); // preserve <h2>
  }

  // Subheading (paragraph)
  const paragraph = element.querySelector('.rich-text p');
  if (paragraph) {
    subheading = paragraph.cloneNode(true); // preserve <p>
  }

  // CTA buttons
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup) {
    const links = buttonGroup.querySelectorAll('a');
    links.forEach(link => {
      ctas.push(link.cloneNode(true)); // preserve <a>
    });
  }

  // Compose content cell for row 3
  const contentCell = document.createElement('div');
  if (heading) contentCell.appendChild(heading);
  if (subheading) contentCell.appendChild(subheading);
  ctas.forEach(cta => contentCell.appendChild(cta));

  // Build table rows
  const rows = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentCell]
  ];

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
