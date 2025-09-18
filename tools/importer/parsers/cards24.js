/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards24)'];

  // Get all card anchors (each card is an <a> block)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows for each card
  const rows = cardLinks.map(card => {
    // Image: first child div contains the image
    const imageDiv = card.querySelector(':scope > div');
    let imageEl = null;
    if (imageDiv) {
      imageEl = imageDiv.querySelector('img');
    }

    // Text content: tag + date + heading
    // Second child div contains tag and date
    const infoDiv = card.querySelectorAll(':scope > div')[1];
    // Heading is the <h3>
    const headingEl = card.querySelector('h3');

    // Compose text cell
    const textCellContent = [];
    if (infoDiv) {
      textCellContent.push(infoDiv);
    }
    if (headingEl) {
      textCellContent.push(headingEl);
    }

    return [imageEl, textCellContent];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
