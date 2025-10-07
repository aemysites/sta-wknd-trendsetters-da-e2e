/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block header
  const headerRow = ['Cards (cards34)'];

  // Find all card anchor elements (each card is an <a> inside the grid container)
  const cardAnchors = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // Build rows for each card
  const rows = cardAnchors.map(card => {
    // Card image (first <img> inside the card)
    const img = card.querySelector('img');

    // Card text container (the div after the img)
    // This contains tag, time, heading, description, and CTA
    const textContainer = img && img.nextElementSibling;
    let textContent = [];
    if (textContainer) {
      // Tag and time (first flex-horizontal div)
      const metaRow = textContainer.querySelector('.flex-horizontal');
      if (metaRow) textContent.push(metaRow);
      // Heading (h3)
      const heading = textContainer.querySelector('h3');
      if (heading) textContent.push(heading);
      // Description (p)
      const desc = textContainer.querySelector('p');
      if (desc) textContent.push(desc);
      // CTA (the last div inside textContainer, usually contains 'Read')
      // Find all divs, get the last one (that is not metaRow)
      const divs = Array.from(textContainer.querySelectorAll('div'));
      const ctaDiv = divs.length ? divs[divs.length - 1] : null;
      // Only add CTA if it's not the metaRow and not the container itself
      if (ctaDiv && ctaDiv !== metaRow && ctaDiv !== textContainer) {
        textContent.push(ctaDiv);
      }
    }
    // Each row: [image, text content]
    return [img, textContent];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
