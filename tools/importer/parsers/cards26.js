/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Get all immediate children (cards/images)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  cardDivs.forEach((cardDiv) => {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');

    // Find the text content (title/desc)
    let textContent = null;
    // Look for a relative wrapper with text
    const relWrapper = cardDiv.querySelector('.utility-position-relative');
    if (relWrapper) {
      // Use the deepest padding div for text
      const padDiv = relWrapper.querySelector('.utility-padding-all-2rem');
      if (padDiv) {
        // Compose text content: heading and paragraph
        const heading = padDiv.querySelector('h3');
        const para = padDiv.querySelector('p');
        const frag = document.createDocumentFragment();
        if (heading) frag.appendChild(heading);
        if (para) frag.appendChild(para);
        textContent = frag;
      }
    }
    // Defensive: If no text found, leave cell empty
    if (!textContent) {
      textContent = document.createDocumentFragment();
    }

    // Defensive: If no image, skip this card
    if (!img) return;

    // Add row: [image, text]
    rows.push([img, textContent]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
