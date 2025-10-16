/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, multiple rows
  // Header row
  const headerRow = ['Cards (cards34)'];

  // Find all card anchor elements (each card is an <a> inside the grid)
  const cardAnchors = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  // Helper function to extract card content
  function extractCardContent(cardAnchor) {
    // Find the main grid inside the anchor
    const cardGrid = cardAnchor.querySelector('.grid-layout');
    // Find image (mandatory)
    const img = cardGrid.querySelector('img');

    // Find the content container (the div after the image)
    const contentDivs = Array.from(cardGrid.children).filter(child => child.tagName === 'DIV');
    const contentDiv = contentDivs.length > 0 ? contentDivs[0] : null;

    // Defensive: If no contentDiv, fallback to cardGrid
    const contentSource = contentDiv || cardGrid;

    // Extract tag and read time (top row)
    const tagRow = contentSource.querySelector('.flex-horizontal');
    // Extract heading
    const heading = contentSource.querySelector('h3, .h4-heading');
    // Extract description
    const description = contentSource.querySelector('p');
    // Extract CTA ("Read")
    // Find the last div inside contentSource that contains 'Read'
    let cta = null;
    const ctaDivs = Array.from(contentSource.querySelectorAll('div'));
    for (const div of ctaDivs) {
      if (div.textContent.trim().toLowerCase() === 'read') {
        cta = div;
        break;
      }
    }
    // Wrap CTA with link if possible
    let ctaLink = null;
    if (cta && cardAnchor.href) {
      ctaLink = document.createElement('a');
      ctaLink.href = cardAnchor.href;
      ctaLink.textContent = cta.textContent;
    }

    // Compose the right cell content
    const rightCellContent = [];
    if (tagRow) rightCellContent.push(tagRow);
    if (heading) rightCellContent.push(heading);
    if (description) rightCellContent.push(description);
    if (ctaLink) rightCellContent.push(ctaLink);

    return [img, rightCellContent];
  }

  // Build rows for each card
  const rows = cardAnchors.map(cardAnchor => extractCardContent(cardAnchor));

  // Compose final table data
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
