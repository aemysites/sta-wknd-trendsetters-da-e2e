/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as specified
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Get all immediate child <a> elements (each card)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach((card) => {
    // Find the image (mandatory)
    const img = card.querySelector('img');

    // Find the text content wrapper (the div after the image)
    const contentDivs = Array.from(card.querySelectorAll(':scope > div'));
    let textContentDiv = null;
    if (contentDivs.length > 0) {
      // The first div after the image contains the text content
      textContentDiv = contentDivs[contentDivs.length - 1];
    } else {
      // Defensive fallback: try to find a div that contains a heading
      textContentDiv = card.querySelector('h3')?.parentElement || card;
    }

    // Compose the text cell
    const textCellContent = [];

    // Tag and time (optional)
    const tagRow = textContentDiv.querySelector('.flex-horizontal');
    if (tagRow) {
      // Collect tag and time as a fragment
      const tagRowFragment = document.createElement('div');
      Array.from(tagRow.children).forEach((child) => {
        tagRowFragment.appendChild(child.cloneNode(true));
      });
      textCellContent.push(tagRowFragment);
    }

    // Title (h3)
    const heading = textContentDiv.querySelector('h3');
    if (heading) {
      textCellContent.push(heading);
    }

    // Description (p)
    const desc = textContentDiv.querySelector('p');
    if (desc) {
      textCellContent.push(desc);
    }

    // CTA ("Read")
    // Find the last div inside textContentDiv that contains "Read"
    const ctaDivs = Array.from(textContentDiv.querySelectorAll('div'));
    const ctaDiv = ctaDivs.find(div => div.textContent.trim().toLowerCase() === 'read');
    if (ctaDiv) {
      // Wrap "Read" in a link to the card's href
      const ctaLink = document.createElement('a');
      ctaLink.href = card.href;
      ctaLink.textContent = ctaDiv.textContent;
      textCellContent.push(ctaLink);
    }

    // Compose the row: [image, text content]
    rows.push([
      img,
      textCellContent
    ]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}
