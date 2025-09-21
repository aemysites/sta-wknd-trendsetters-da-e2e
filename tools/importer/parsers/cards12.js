/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract card info from each <a>
  function extractCardInfo(cardEl) {
    // Find image container and image
    const imgContainer = cardEl.querySelector('.utility-aspect-2x3');
    const img = imgContainer ? imgContainer.querySelector('img') : null;

    // Find tag and date
    const metaRow = cardEl.querySelector('.flex-horizontal');
    let tag = null;
    let date = null;
    if (metaRow) {
      const metaChildren = metaRow.children;
      if (metaChildren.length >= 2) {
        tag = metaChildren[0];
        date = metaChildren[1];
      }
    }

    // Find heading
    const heading = cardEl.querySelector('h3');

    // Compose text cell
    const textCell = [];
    // Tag and date row (optional, small text)
    if (tag || date) {
      const metaDiv = document.createElement('div');
      metaDiv.style.display = 'flex';
      metaDiv.style.gap = '0.5em';
      if (tag) metaDiv.appendChild(tag);
      if (date) metaDiv.appendChild(date);
      textCell.push(metaDiv);
    }
    // Heading
    if (heading) {
      textCell.push(heading);
    }

    return [img, textCell];
  }

  // Build table rows
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Get all direct card links
  const cards = element.querySelectorAll(':scope > a.utility-link-content-block');
  cards.forEach((cardEl) => {
    const [img, textCell] = extractCardInfo(cardEl);
    rows.push([img, textCell]);
  });

  // Create block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
