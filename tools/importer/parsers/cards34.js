/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all text content from a card content div, preserving order
  function extractCardTextContent(cardContentDiv) {
    // Collect all elements in order: heading, description, CTA, plus tags and meta info
    const cellContent = [];
    // Find the horizontal flex row for tag and meta (first child div)
    const flexRow = cardContentDiv.querySelector('.flex-horizontal');
    if (flexRow) {
      // Add all children of flexRow (tag, meta info)
      Array.from(flexRow.children).forEach((el) => cellContent.push(el));
    }
    // Heading
    const heading = cardContentDiv.querySelector('h3, .h4-heading');
    if (heading) cellContent.push(heading);
    // Description
    const desc = cardContentDiv.querySelector('p');
    if (desc) cellContent.push(desc);
    // CTA: find last div with text 'Read' (case-insensitive)
    const ctaDivs = Array.from(cardContentDiv.querySelectorAll('div'));
    for (let i = ctaDivs.length - 1; i >= 0; i--) {
      if (ctaDivs[i].textContent.trim().toLowerCase() === 'read') {
        cellContent.push(ctaDivs[i]);
        break;
      }
    }
    return cellContent;
  }

  // Get all direct children that are cards (<a> elements)
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Build table rows
  const rows = [];
  // Header row
  const headerRow = ['Cards (cards34)'];
  rows.push(headerRow);

  // Each card row: [image, text content]
  cardLinks.forEach((cardLink) => {
    // <a ...>
    //   <div ...>
    //     <img ...>
    //     <div> ... </div>
    //   </div>
    // </a>
    const gridDiv = cardLink.querySelector(':scope > div');
    if (!gridDiv) return;
    const img = gridDiv.querySelector('img');
    // The text content is the first div inside gridDiv after the image
    const cardContentDivs = Array.from(gridDiv.children).filter((n) => n.tagName === 'DIV');
    const cardContentDiv = cardContentDivs.length > 0 ? cardContentDivs[0] : null;
    // Defensive: fallback to gridDiv if not found
    let textCellContent = [];
    if (cardContentDiv) {
      textCellContent = extractCardTextContent(cardContentDiv);
    }
    // If no content found, fallback to all text nodes
    if (textCellContent.length === 0) {
      textCellContent.push(document.createTextNode(cardLink.textContent.trim()));
    }
    rows.push([
      img || '',
      textCellContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
