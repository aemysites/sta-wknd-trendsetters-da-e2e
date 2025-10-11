/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Carousel (carousel24)
  const headerRow = ['Carousel (carousel24)'];

  // Find the card body (where the image and text live)
  const cardBody = element.querySelector('.card-body');
  const cardContent = cardBody || element;

  // Find the image (mandatory for carousel slide)
  const img = cardContent.querySelector('img');

  // Find the heading (optional)
  const heading = cardContent.querySelector('.h4-heading');

  // Attempt to extract overlay/faint text from the card (if present)
  // Look for any div/span with textContent that is not the heading
  let overlayText = '';
  Array.from(cardContent.querySelectorAll('div, span')).forEach((el) => {
    // Exclude heading
    if (el !== heading && el.textContent && el.textContent.trim() && el.textContent.trim() !== heading?.textContent) {
      overlayText = el.textContent.trim();
    }
  });

  // Compose the text cell (heading if present, plus overlay text if found)
  let textCell = '';
  if (heading) {
    const h4 = document.createElement('h4');
    h4.textContent = heading.textContent;
    if (overlayText) {
      // Add overlay text below heading
      const p = document.createElement('p');
      p.textContent = overlayText;
      textCell = [h4, p];
    } else {
      textCell = h4;
    }
  } else if (overlayText) {
    const p = document.createElement('p');
    p.textContent = overlayText;
    textCell = p;
  }

  // Build the rows: first row is header, second row is [image, text]
  const rows = [
    headerRow,
    [img, textCell]
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
