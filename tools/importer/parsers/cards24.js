/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards24) block: each card has image (first cell), text (second cell)
  // Header row
  const headerRow = ['Cards (cards24)'];

  // Find card containers
  const cardBodies = element.querySelectorAll('.card-body');
  const rows = [];

  cardBodies.forEach((cardBody) => {
    // Extract image (mandatory, first cell)
    const img = cardBody.querySelector('img');
    // Extract heading (optional, second cell)
    const headingDiv = cardBody.querySelector('.h4-heading');
    let heading = null;
    if (headingDiv) {
      heading = document.createElement('h4');
      heading.textContent = headingDiv.textContent;
    }
    // Extract all text nodes (including faint captions) and visible text
    const textCellContent = [];
    if (heading) textCellContent.push(heading);
    // Collect all additional visible text nodes (non-heading, non-image)
    cardBody.childNodes.forEach((node) => {
      if (
        node.nodeType === 3 && node.textContent.trim() &&
        (!headingDiv || node.textContent.trim() !== headingDiv.textContent.trim())
      ) {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textCellContent.push(p);
      }
      if (
        node.nodeType === 1 && // element
        node !== headingDiv &&
        node.tagName !== 'IMG' &&
        !node.classList.contains('h4-heading') &&
        node.textContent.trim()
      ) {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textCellContent.push(p);
      }
    });
    // Defensive: if no heading or description, check for alt text on image
    if (textCellContent.length === 0 && img && img.alt) {
      const p = document.createElement('p');
      p.textContent = img.alt;
      textCellContent.push(p);
    }
    rows.push([
      img || '',
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Build table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
