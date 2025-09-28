/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only parse if element exists
  if (!element) return;

  // Table header row as specified
  const headerRow = ['Cards (cards24)'];

  // Find card content
  // The structure is: element > div > div.card > div.card-body > [div.h4-heading, img]
  let cardBody;
  // Find the .card-body inside the element
  const cardBodyCandidates = element.querySelectorAll('.card-body');
  if (cardBodyCandidates.length > 0) {
    cardBody = cardBodyCandidates[0];
  } else {
    // fallback: try to find a div with heading and image
    cardBody = element;
  }

  // Extract image (mandatory, first cell)
  let imageEl = cardBody.querySelector('img');
  // Defensive: Only use if exists
  if (!imageEl) {
    // fallback: look for image anywhere in element
    imageEl = element.querySelector('img');
  }

  // Extract title (optional, styled as heading)
  let titleEl = cardBody.querySelector('.h4-heading');
  // Defensive: Only use if exists
  if (!titleEl) {
    // fallback: look for any heading
    titleEl = cardBody.querySelector('h4, h3, h2, h1');
  }

  // Compose text cell: title above, then description (if any)
  const textCell = [];
  if (titleEl) textCell.push(titleEl);

  // Description: any text nodes or elements after title and before image
  // We'll look for all direct children of cardBody that are not the image or title
  Array.from(cardBody.childNodes).forEach((node) => {
    if (node === imageEl || node === titleEl) return;
    // Only add non-empty text nodes or elements
    if (node.nodeType === Node.ELEMENT_NODE) {
      // Defensive: skip empty divs
      if (node.textContent && node.textContent.trim()) {
        textCell.push(node);
      }
    } else if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.trim()) {
        // Wrap in a paragraph for clarity
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textCell.push(p);
      }
    }
  });

  // If no description found, but title exists, that's fine (matches example)
  // If neither title nor description, fallback: add alt text from image
  if (textCell.length === 0 && imageEl && imageEl.alt) {
    const p = document.createElement('p');
    p.textContent = imageEl.alt;
    textCell.push(p);
  }

  // Compose rows
  const rows = [headerRow];
  rows.push([
    imageEl || '',
    textCell.length > 0 ? textCell : '',
  ]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
