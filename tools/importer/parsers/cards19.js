/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block: 2 columns, multiple rows
  // Header row
  const headerRow = ['Cards (cards19)'];

  // Find all card elements (direct children of the grid container)
  const cardDivs = Array.from(element.children);

  // Build rows: each card is a row, first cell is icon, second cell is text
  const rows = cardDivs.map(card => {
    // Find icon (img inside .icon)
    const iconWrapper = card.querySelector('.icon');
    let iconImg = iconWrapper ? iconWrapper.querySelector('img') : null;
    // Defensive: if no icon, leave cell empty
    const iconCell = iconImg ? iconImg : '';

    // Find text (first <p> inside card)
    const textP = card.querySelector('p');
    // Defensive: if no <p>, fallback to textContent
    const textCell = textP ? textP : document.createTextNode(card.textContent.trim());

    return [iconCell, textCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
