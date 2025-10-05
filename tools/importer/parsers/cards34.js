/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Get all immediate child <a> elements (each is a card)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((cardLink) => {
    // Each card has a grid div inside the link
    const cardGrid = cardLink.querySelector(':scope > div');
    if (!cardGrid) return;

    // Find the image (first child)
    const img = cardGrid.querySelector('img');

    // Find the text container (the div after the image)
    const children = Array.from(cardGrid.children);
    const textDiv = children.find(
      (child) => child.tagName === 'DIV' && child !== img
    );
    if (!img || !textDiv) return;

    // Instead of picking only heading/desc/cta, include ALL content from textDiv
    // This ensures we don't miss any text content
    const textCell = Array.from(textDiv.childNodes).filter(
      node => {
        // Only include elements and meaningful text nodes
        return node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      }
    ).map(node => {
      // For CTA, convert 'Read' div to a link
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV' && node.textContent.trim().toLowerCase() === 'read') {
        const ctaLink = document.createElement('a');
        ctaLink.href = cardLink.href;
        ctaLink.textContent = node.textContent;
        return ctaLink;
      }
      return node.cloneNode(true);
    });
    // Defensive: ensure at least some text content
    if (textCell.length === 0) return;

    // Add the row: [image, text]
    rows.push([img, textCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
