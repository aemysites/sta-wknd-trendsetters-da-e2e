/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card data from a card-link element
  function extractCard(cardLink) {
    // Find the image (mandatory)
    const img = cardLink.querySelector('img');
    // Find the tag (optional)
    const tag = cardLink.querySelector('.tag');
    // Find the heading (mandatory)
    const heading = cardLink.querySelector('h3, .h4-heading, h4');
    // Find the description (optional)
    const desc = cardLink.querySelector('p, .paragraph-sm');
    // Find the CTA (optional, in this source it's the cardLink itself)
    // But only include if the cardLink has an href and it's not just '#'
    let cta = null;
    if (cardLink.href && cardLink.getAttribute('href') && cardLink.getAttribute('href') !== '#') {
      // Use the heading text as the CTA label if available
      let ctaText = heading ? heading.textContent.trim() : cardLink.getAttribute('href');
      cta = document.createElement('a');
      cta.href = cardLink.getAttribute('href');
      cta.textContent = ctaText;
    }
    // Compose the text cell
    const textCell = document.createElement('div');
    if (tag) {
      const tagDiv = document.createElement('div');
      tagDiv.appendChild(tag.cloneNode(true));
      tagDiv.style.marginBottom = '0.5em';
      textCell.appendChild(tagDiv);
    }
    if (heading) {
      const h = document.createElement('strong');
      h.textContent = heading.textContent;
      textCell.appendChild(h);
      textCell.appendChild(document.createElement('br'));
    }
    if (desc) {
      textCell.appendChild(document.createTextNode(desc.textContent));
    }
    if (cta) {
      textCell.appendChild(document.createElement('br'));
      textCell.appendChild(cta);
    }
    return [img, textCell];
  }

  // Get all card-link elements (direct children)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.card-link'));
  const rows = cardLinks.map(extractCard);

  // Build the table
  const headerRow = ['Cards (cards10)'];
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(table);
}
