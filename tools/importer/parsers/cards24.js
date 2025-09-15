/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards24)'];
  const rows = [headerRow];

  // Get all card links (each card is an <a> child)
  const cards = element.querySelectorAll(':scope > a');

  cards.forEach(card => {
    // Image: first child div contains the image
    const imageContainer = card.querySelector(':scope > div');
    let image = imageContainer ? imageContainer.querySelector('img') : null;

    // Text content: tag, date, heading
    // Tag and date are in the second div
    const infoDivs = card.querySelectorAll(':scope > div');
    let tagDateDiv = infoDivs.length > 1 ? infoDivs[1] : null;
    let heading = card.querySelector('h3, .h4-heading');

    // Compose text cell
    const textContent = [];
    if (tagDateDiv) {
      // Defensive: combine tag and date
      const tag = tagDateDiv.querySelector('.tag');
      const date = tagDateDiv.querySelector('.paragraph-sm');
      if (tag || date) {
        const tagDateWrap = document.createElement('div');
        if (tag) tagDateWrap.appendChild(tag);
        if (date) tagDateWrap.appendChild(date);
        textContent.push(tagDateWrap);
      }
    }
    if (heading) {
      textContent.push(heading);
    }

    // Add row: [image, textContent]
    rows.push([
      image,
      textContent
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
