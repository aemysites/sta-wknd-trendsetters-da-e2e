/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required by block spec
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Get all immediate card children
  const cardDivs = element.querySelectorAll(':scope > div');

  cardDivs.forEach(card => {
    // Find icon/image (first .icon img inside card)
    let iconImg = null;
    const iconDiv = card.querySelector('.icon');
    if (iconDiv) {
      iconImg = iconDiv.querySelector('img');
    }
    // Defensive: if no icon, fallback to first img
    if (!iconImg) {
      iconImg = card.querySelector('img');
    }

    // Find text content (first <p> inside card)
    let textContent = card.querySelector('p');
    // Defensive: fallback to all text nodes if no <p>
    if (!textContent) {
      textContent = document.createElement('span');
      textContent.textContent = card.textContent;
    }

    // Compose row: [icon/image, text content]
    // Only include the actual elements, not clones
    rows.push([
      iconImg ? iconImg : '',
      textContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
