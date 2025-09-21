/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards34)'];

  // Get all direct child anchor elements (each card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build rows for each card
  const rows = cardLinks.map((card) => {
    // Find the image (first img inside the card)
    const img = card.querySelector('img');

    // Find the inner grid that contains all text content
    // (the div that is a sibling of the img)
    const innerGrid = img ? img.nextElementSibling : null;
    let textContent = [];
    if (innerGrid) {
      // Tag and read time row (optional)
      const tagRow = innerGrid.querySelector('.flex-horizontal');
      if (tagRow) {
        textContent.push(tagRow);
      }
      // Heading (h3)
      const heading = innerGrid.querySelector('h3');
      if (heading) {
        textContent.push(heading);
      }
      // Description (p)
      const desc = innerGrid.querySelector('p');
      if (desc) {
        textContent.push(desc);
      }
      // CTA ("Read")
      // Find the last div inside innerGrid (usually the CTA)
      const ctaDivs = innerGrid.querySelectorAll('div');
      if (ctaDivs.length) {
        const cta = ctaDivs[ctaDivs.length - 1];
        // Only add if it's the actual CTA ("Read")
        if (cta.textContent.trim().toLowerCase() === 'read') {
          // Wrap CTA in a link to the card's href
          const ctaLink = document.createElement('a');
          ctaLink.href = card.href;
          ctaLink.textContent = cta.textContent;
          textContent.push(ctaLink);
        }
      }
    }
    // Build the table row: [image, text content]
    return [img, textContent];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
