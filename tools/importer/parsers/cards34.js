/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all direct card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a'));

  // Table header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  cardLinks.forEach((cardLink) => {
    // Find the inner grid (contains image + content)
    const innerGrid = cardLink.querySelector(':scope > div');
    if (!innerGrid) return;

    // Find image (mandatory)
    const img = innerGrid.querySelector('img');

    // Find content container (the div after img)
    const contentDivs = Array.from(innerGrid.children).filter(child => child !== img);
    const contentDiv = contentDivs.length ? contentDivs[0] : null;

    // Compose text cell
    const textCellContent = [];
    if (contentDiv) {
      // Tag and read time row
      const tagRow = contentDiv.querySelector('.flex-horizontal');
      if (tagRow) textCellContent.push(tagRow);
      // Heading
      const heading = contentDiv.querySelector('h3, .h4-heading');
      if (heading) textCellContent.push(heading);
      // Description
      const desc = contentDiv.querySelector('p');
      if (desc) textCellContent.push(desc);
      // CTA ("Read")
      // Find last div inside contentDiv (usually the CTA)
      const ctaDivs = Array.from(contentDiv.querySelectorAll(':scope > div'));
      if (ctaDivs.length) {
        const cta = ctaDivs[ctaDivs.length - 1];
        if (cta && cta.textContent.trim().toLowerCase().includes('read')) {
          textCellContent.push(cta);
        }
      }
    }
    // Defensive: If nothing found, fallback to all except img
    if (textCellContent.length === 0 && contentDiv) {
      textCellContent.push(contentDiv);
    }

    // Compose row: [image, text content]
    const row = [img, textCellContent];
    rows.push(row);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
