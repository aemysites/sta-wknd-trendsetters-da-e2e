/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: 2 columns, multiple rows, each row = [image, text]
  // Even if no text is present, the second column must exist (empty)

  // Header row as required
  const headerRow = ['Cards (cards35)'];

  // Each immediate child div is a card
  const cardDivs = Array.from(element.children);

  // For each card, extract the image (first/only child)
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // For image-only cards, text cell is empty
    return [img, ''];
  });

  // Assemble table data
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
