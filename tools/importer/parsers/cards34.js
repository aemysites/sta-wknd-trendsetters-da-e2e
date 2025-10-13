/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: extract each card's image and text content
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Select all direct child anchor elements (each is a card)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Image: first img inside the card
    const img = card.querySelector('img');

    // Text content container: the div after the image
    const innerGrid = card.querySelector('div.w-layout-grid');
    let textContentDiv = null;
    if (innerGrid) {
      // The text content is the div after the image
      const children = Array.from(innerGrid.children);
      textContentDiv = children.find((el) => el !== img);
    }
    if (!textContentDiv) {
      const divs = card.querySelectorAll('div');
      textContentDiv = divs.length > 1 ? divs[1] : divs[0];
    }

    // Fix: ensure the CTA 'Read' is a link using the card's href
    // Find the 'Read' element inside textContentDiv
    let ctaDiv = textContentDiv.querySelector('div');
    let cta;
    // Find the div with text 'Read' (case-insensitive)
    cta = Array.from(textContentDiv.querySelectorAll('div')).find((d) => d.textContent.trim().toLowerCase() === 'read');
    if (cta) {
      // Replace the CTA div with an <a> element
      const link = document.createElement('a');
      link.href = card.getAttribute('href');
      link.textContent = 'Read';
      cta.replaceWith(link);
    }

    // Compose row: [image, text content]
    rows.push([img, textContentDiv]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
