/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, header row, each card = 1 row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find all card anchor elements (each card is an <a> direct child)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // Find the image (first img inside the card)
    const img = card.querySelector('img');

    // Find the text content container (the div after the image)
    // It contains tag, read time, heading, description, CTA
    // The card structure is: <a><div.grid><img/><div.content></div></div></a>
    // So, the second child div of the grid is the text content
    const gridDiv = card.querySelector('div.w-layout-grid');
    let textContentDiv = null;
    if (gridDiv) {
      // Find all direct children of gridDiv
      const gridChildren = Array.from(gridDiv.children);
      // Find the first div after the image
      textContentDiv = gridChildren.find(
        (el) => el.tagName === 'DIV' && !el.querySelector('img')
      );
    }
    // Defensive: fallback to the first div after the image
    if (!textContentDiv) {
      // Try: the div containing the heading
      textContentDiv = card.querySelector('h3, h4')?.parentElement;
    }
    // Defensive: if not found, fallback to the card itself
    if (!textContentDiv) textContentDiv = card;

    // Ensure all text content is included in the text cell
    // Reference the actual element, do not clone or create new elements
    rows.push([
      img,
      textContentDiv
    ]);
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
