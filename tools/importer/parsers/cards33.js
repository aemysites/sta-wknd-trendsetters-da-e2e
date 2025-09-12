/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Cards (cards33)'];

  // Get all immediate child <a> elements (each card)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build rows for each card
  const rows = cardLinks.map((card) => {
    // Find the card's image (first img inside the card)
    const img = card.querySelector('img');

    // Find the card's main content container (the inner grid div)
    // This is the second child of the <a>, which contains all text
    const innerGrid = card.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.y-center.grid-gap-sm');

    // Defensive: If innerGrid is missing, fallback to the <a> itself
    const contentContainer = innerGrid || card;

    // Extract the heading (h3), description (p), and CTA ("Read" div)
    const heading = contentContainer.querySelector('h3');
    const description = contentContainer.querySelector('p');
    // Find the last div inside contentContainer (usually the CTA)
    const ctaDivs = contentContainer.querySelectorAll('div');
    let cta = null;
    if (ctaDivs.length > 0) {
      // Find a div whose text is 'Read' (case-insensitive)
      cta = Array.from(ctaDivs).find(d => d.textContent.trim().toLowerCase() === 'read');
    }

    // Extract the tag and read time (optional)
    const tagRow = contentContainer.querySelector('.flex-horizontal.align-center.flex-gap-xs.utility-margin-bottom-1rem');
    // We'll include tagRow if present, as it contains tag and read time

    // Compose the text cell contents
    const textCellContents = [];
    if (tagRow) textCellContents.push(tagRow);
    if (heading) textCellContents.push(heading);
    if (description) textCellContents.push(description);
    if (cta) textCellContents.push(cta);

    // Each row: [image, text content]
    return [img, textCellContents];
  });

  // Compose the table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
