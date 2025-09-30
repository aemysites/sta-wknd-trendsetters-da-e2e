/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Get all direct card links (each card is an <a> element)
  const cardLinks = element.querySelectorAll(':scope > a');

  cardLinks.forEach((cardLink) => {
    // Find image (mandatory)
    const img = cardLink.querySelector('img');

    // Find card content container (the div after the image)
    // Instead of assuming position, find the div containing h3
    let textContentDiv = null;
    const divs = cardLink.querySelectorAll('div');
    for (const div of divs) {
      if (div.querySelector('h3')) {
        textContentDiv = div;
        break;
      }
    }
    if (!textContentDiv) {
      // fallback: use last div
      textContentDiv = divs[divs.length - 1];
    }

    // Compose text cell contents
    const textCellElements = [];

    // Extract tag (first .tag div), time (first .paragraph-sm), title (h3), description (p), CTA (last div with text 'Read')
    const tagDiv = textContentDiv.querySelector('.tag');
    if (tagDiv) {
      // Use only the text inside the innermost div
      const tagText = tagDiv.textContent.trim();
      if (tagText) {
        const span = document.createElement('span');
        span.textContent = tagText;
        textCellElements.push(span);
      }
    }
    const timeDiv = textContentDiv.querySelector('.paragraph-sm');
    if (timeDiv) {
      const span = document.createElement('span');
      span.textContent = timeDiv.textContent.trim();
      textCellElements.push(span);
    }
    const title = textContentDiv.querySelector('h3');
    if (title) textCellElements.push(title);
    const description = textContentDiv.querySelector('p');
    if (description) textCellElements.push(description);
    let cta = null;
    Array.from(textContentDiv.querySelectorAll('div')).forEach((div) => {
      if (div.textContent.trim().toLowerCase() === 'read') {
        cta = div;
      }
    });
    if (cta && cardLink.href) {
      const link = document.createElement('a');
      link.href = cardLink.href;
      link.textContent = cta.textContent;
      textCellElements.push(link);
    }

    // Add card row: [image, text content]
    rows.push([
      img,
      textCellElements
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
