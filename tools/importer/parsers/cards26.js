/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, first column = image, second column = text (heading, description)
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Identify all direct children that represent cards
  const cardDivs = Array.from(element.children);

  cardDivs.forEach(card => {
    // Find the image (mandatory)
    const img = card.querySelector('img');
    if (!img) return; // skip if no image

    // Gather all heading and paragraph elements inside the card
    const headings = card.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const paragraphs = card.querySelectorAll('p');

    // Compose a fragment with all text content (heading(s) and paragraph(s)), preserving order
    let textContent = null;
    const frag = document.createElement('div');
    // Add headings in order
    headings.forEach(h => {
      frag.appendChild(h.cloneNode(true));
    });
    // Add paragraphs in order
    paragraphs.forEach(p => {
      frag.appendChild(p.cloneNode(true));
    });
    // If no heading or paragraph, leave cell empty (do NOT use alt text)
    if (frag.childNodes.length > 0) {
      textContent = frag;
    } else {
      textContent = '';
    }

    rows.push([
      img,
      textContent
    ]);
  });

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
