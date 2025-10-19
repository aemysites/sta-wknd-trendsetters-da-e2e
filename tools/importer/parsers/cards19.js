/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all direct card containers (each card is a flex-horizontal div)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach(card => {
    // Icon: find .icon > img (SVG or image)
    const iconDiv = card.querySelector('.icon');
    let iconImg = iconDiv ? iconDiv.querySelector('img') : null;
    // Defensive: If no icon, fallback to iconDiv itself (for future-proofing)
    let iconCell = iconImg || iconDiv || '';

    // Text: find the first <p> inside card
    const textP = card.querySelector('p');
    // Defensive: fallback to text content if no <p>
    let textCell = textP || document.createTextNode(card.textContent.trim());

    rows.push([iconCell, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
