/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each anchor
  function extractCardInfo(cardEl) {
    // Find the image (mandatory)
    const img = cardEl.querySelector('img');
    // Find the text container (the div after img)
    const textContainer = img.nextElementSibling;
    let heading = textContainer.querySelector('h3, .h4-heading');
    let desc = textContainer.querySelector('p');
    let cta = null;
    // Find CTA: look for a div with text 'Read' (case-insensitive)
    Array.from(textContainer.querySelectorAll('div')).forEach(div => {
      if (div.textContent.trim().toLowerCase() === 'read') {
        cta = div;
      }
    });
    // Tag and meta info (optional, above heading)
    const metaRow = textContainer.querySelector('.flex-horizontal');
    let meta = [];
    if (metaRow) {
      meta = Array.from(metaRow.children);
    }
    // Compose text cell content
    const textCell = document.createElement('div');
    if (meta.length) {
      const metaDiv = document.createElement('div');
      meta.forEach(m => metaDiv.appendChild(m));
      textCell.appendChild(metaDiv);
    }
    if (heading) {
      textCell.appendChild(heading);
    }
    if (desc) {
      textCell.appendChild(desc);
    }
    if (cta) {
      textCell.appendChild(cta);
    }
    return [img, textCell];
  }

  // Get all direct child anchors (cards)
  const cards = Array.from(element.querySelectorAll(':scope > a'));
  const rows = [ ['Cards (cards34)'] ];

  cards.forEach(cardEl => {
    rows.push(extractCardInfo(cardEl));
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
