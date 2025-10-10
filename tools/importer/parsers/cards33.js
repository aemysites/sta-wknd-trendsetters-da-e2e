/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards33)'];

  // Find all card anchor elements (each card is an <a> direct child)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // Build rows for each card
  const rows = cardLinks.map(card => {
    // Find the image (mandatory, always first img in card)
    const img = card.querySelector('img');

    // Find the text content container (the div after the image)
    // This is the second child of the grid inside the card
    const grid = card.querySelector('.w-layout-grid');
    // The text content is the first div after the image
    // But in this markup, it's the div that is not the image
    let textContentDiv = null;
    if (grid) {
      const children = Array.from(grid.children);
      textContentDiv = children.find(child => child !== img);
    }

    // Defensive fallback: if not found, try next sibling of img
    if (!textContentDiv && img && img.nextElementSibling) {
      textContentDiv = img.nextElementSibling;
    }

    // The text cell should contain:
    // - Tag (optional, .tag)
    // - Time to read (optional, .paragraph-sm)
    // - Heading (h3.h4-heading)
    // - Description (p)
    // - CTA (the last div with text 'Read')
    // We'll keep the entire textContentDiv for robustness
    
    return [img, textContentDiv];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
