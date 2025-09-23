/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Defensive: get all immediate card links (cards)
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');

  cards.forEach(card => {
    // Get image (first child div contains img)
    const imageContainer = card.querySelector(':scope > div');
    const img = imageContainer ? imageContainer.querySelector('img') : null;

    // Get tag and date (second child div)
    const metaDiv = card.querySelectorAll(':scope > div')[1];
    let tag = '', date = '';
    if (metaDiv) {
      const tagDiv = metaDiv.querySelector('.tag');
      if (tagDiv) tag = tagDiv.textContent.trim();
      const dateDiv = metaDiv.querySelector('.paragraph-sm');
      if (dateDiv) date = dateDiv.textContent.trim();
    }

    // Get title (h3)
    const title = card.querySelector('h3');

    // Compose text cell
    const textCell = document.createElement('div');
    // Tag and date row
    if (tag || date) {
      const metaRow = document.createElement('div');
      if (tag) {
        const tagSpan = document.createElement('span');
        tagSpan.textContent = tag;
        tagSpan.style.fontWeight = 'bold';
        metaRow.appendChild(tagSpan);
      }
      if (date) {
        const dateSpan = document.createElement('span');
        dateSpan.textContent = ' ' + date;
        metaRow.appendChild(dateSpan);
      }
      textCell.appendChild(metaRow);
    }
    // Title
    if (title) {
      const heading = document.createElement('div');
      heading.appendChild(title);
      textCell.appendChild(heading);
    }
    // If there is a link, make the title a link (call-to-action)
    // In this design, the card itself is a link, but we don't need to add a CTA at the bottom
    // If needed, could add a CTA link at the bottom:
    // const cta = document.createElement('a');
    // cta.href = card.href;
    // cta.textContent = 'Read more';
    // textCell.appendChild(cta);

    // Compose row: [image, text]
    rows.push([
      img,
      textCell
    ]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
