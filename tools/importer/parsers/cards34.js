/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor/card element
  function extractCardInfo(card) {
    // Find the image (mandatory)
    const img = card.querySelector('img');

    // Find all content blocks inside the card
    const contentDiv = card.querySelector('div:not(:has(img))');
    let textCellContent = [];
    if (contentDiv) {
      // Collect all children except the image
      // This ensures all text, tags, headings, paragraphs, and CTA are included
      textCellContent = Array.from(contentDiv.children);
    } else {
      // Fallback: collect all non-image children of the card
      textCellContent = Array.from(card.children).filter(child => child.tagName !== 'IMG');
    }

    return [img, textCellContent];
  }

  // Find all cards (direct children <a> of the main grid)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  // Table header
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // For each card, extract info and push as a row
  cards.forEach(card => {
    const [img, textCellContent] = extractCardInfo(card);
    // Defensive: Only add row if image and at least one text content
    if (img && textCellContent.length > 0) {
      rows.push([img, textCellContent]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(table);
}
