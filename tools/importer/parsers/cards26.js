/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block header
  const headerRow = ['Cards (cards26)'];

  // Helper: Extract image and text for each card
  function extractCard(cardDiv) {
    // Find image (mandatory)
    const img = cardDiv.querySelector('img');
    if (!img) return null;
    const imageCell = img;

    // Find text container (look for utility-padding-all-2rem, or heading/paragraph)
    let textCell = '';
    let textContainer = cardDiv.querySelector('.utility-padding-all-2rem');
    if (!textContainer) {
      textContainer = cardDiv.querySelector('.utility-position-relative');
    }
    if (textContainer) {
      textCell = Array.from(textContainer.children);
    } else {
      // Fallback: try heading or paragraph directly
      const heading = cardDiv.querySelector('h1, h2, h3, h4, h5, h6');
      const para = cardDiv.querySelector('p');
      const nodes = [];
      if (heading) nodes.push(heading);
      if (para) nodes.push(para);
      if (nodes.length) textCell = nodes;
      else textCell = '';
    }
    return [imageCell, textCell];
  }

  // Only direct children are cards
  const cardDivs = Array.from(element.children);
  // Build table rows for each card
  const rows = cardDivs.map(extractCard).filter(Boolean);
  // Compose table data
  const tableData = [headerRow, ...rows];
  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the grid element with the block table
  element.replaceWith(block);
}
