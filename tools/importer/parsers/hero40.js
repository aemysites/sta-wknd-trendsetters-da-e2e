/* global WebImporter */
export default function parse(element, { document }) {
  // === HERO (hero40) BLOCK PARSER ===
  // Helper: Get immediate children
  const children = Array.from(element.querySelectorAll(':scope > div'));

  // Find the image for the background
  let bgImg = null;
  for (const div of children) {
    const img = div.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // Find the text content container (headline, paragraph, button)
  let textContainer = null;
  for (const div of children) {
    // Look for a container with headings and paragraph
    if (div.querySelector('h1, h2, h3, p, .button-group')) {
      textContainer = div;
      break;
    }
  }

  // Extract headline (h1)
  let headline = null;
  if (textContainer) {
    headline = textContainer.querySelector('h1');
  }

  // Extract paragraph (subheading)
  let subheading = null;
  if (textContainer) {
    subheading = textContainer.querySelector('p');
  }

  // Extract CTA button (anchor)
  let cta = null;
  if (textContainer) {
    const buttonGroup = textContainer.querySelector('.button-group');
    if (buttonGroup) {
      cta = buttonGroup.querySelector('a');
    }
  }

  // Compose the content cell for row 3
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // Compose table rows
  const headerRow = ['Hero (hero40)'];
  const imageRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  // Build the block table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
