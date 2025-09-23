/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract image and text content for a carousel slide
  function extractSlideContent(root) {
    let img = null;
    let textCell = null;

    // Find the image element (mandatory)
    img = root.querySelector('img');

    // Find the heading (optional)
    const heading = root.querySelector('.h4-heading');
    if (heading) {
      // Use the heading element as is (preserves semantic meaning)
      textCell = heading;
    }

    return [img, textCell];
  }

  // Table header must match target block name exactly
  const headerRow = ['Carousel (carousel24)'];
  const rows = [headerRow];

  // The HTML structure is a single card slide
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    const [img, textCell] = extractSlideContent(cardBody);
    // Only add a row if image exists (image is mandatory)
    if (img) {
      rows.push([img, textCell || '']);
    }
  }

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element with the table
  element.replaceWith(table);
}
