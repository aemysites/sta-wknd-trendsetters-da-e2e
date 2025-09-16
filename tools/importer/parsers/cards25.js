/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards25)'];
  const rows = [headerRow];

  // Get all immediate children of the grid container
  const cards = Array.from(element.querySelectorAll(':scope > div'));

  cards.forEach(card => {
    // Defensive: Find the image (mandatory)
    const img = card.querySelector('img');
    // Defensive: Find the content wrapper (may contain h3, p)
    let textContent = null;
    const contentWrapper = card.querySelector('.utility-padding-all-2rem');
    if (contentWrapper) {
      // Collect heading and paragraph if present
      const heading = contentWrapper.querySelector('h3');
      const paragraph = contentWrapper.querySelector('p');
      // Compose text cell
      const textCell = [];
      if (heading) textCell.push(heading);
      if (paragraph) textCell.push(paragraph);
      textContent = textCell;
    }
    // If no content wrapper, try to find heading/paragraph directly
    if (!textContent) {
      const heading = card.querySelector('h3');
      const paragraph = card.querySelector('p');
      const textCell = [];
      if (heading) textCell.push(heading);
      if (paragraph) textCell.push(paragraph);
      textContent = textCell.length ? textCell : '';
    }
    // If no heading/paragraph, leave cell empty
    if (!textContent || (Array.isArray(textContent) && textContent.length === 0)) {
      textContent = '';
    }
    // Only add rows for cards with images
    if (img) {
      rows.push([img, textContent]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
