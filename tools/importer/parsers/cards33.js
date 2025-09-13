/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards33)'];
  const rows = [headerRow];

  // Get all card links (each card is an <a> element)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((cardLink) => {
    // Find image (first img inside card)
    const img = cardLink.querySelector('img');

    // Find the text content container: the div after the image
    // The structure is: <a> -> <div> (grid) -> <img> + <div> (text)
    // So get the grid container
    const grid = cardLink.querySelector('div.w-layout-grid');
    let textDiv = null;
    if (grid) {
      // Find the div that is not the image
      const children = Array.from(grid.children);
      textDiv = children.find((el) => el !== img);
    }
    // Defensive: fallback to last div in card if not found
    if (!textDiv) {
      const divs = cardLink.querySelectorAll('div');
      textDiv = divs[divs.length - 1];
    }

    // Use the textDiv as-is for the text cell (preserves all formatting, tags, etc)
    rows.push([
      img,
      textDiv
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
