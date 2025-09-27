/* global WebImporter */
export default function parse(element, { document }) {
  // Find all direct card links
  const cardLinks = Array.from(element.querySelectorAll(':scope > a.utility-link-content-block'));

  // Prepare header row
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  cardLinks.forEach(card => {
    // --- Image cell ---
    // Find the first image inside the card
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    let imageEl = imgContainer ? imgContainer.querySelector('img') : null;
    // Reference the existing image element (do not clone or create new)
    const imageCell = imageEl || '';

    // --- Text cell ---
    // Tag and date row (optional, above title)
    const metaRow = card.querySelector('.flex-horizontal');
    let metaFragment = '';
    if (metaRow) {
      // Create a fragment to preserve all text (tag and date)
      metaFragment = document.createElement('div');
      Array.from(metaRow.childNodes).forEach(node => {
        metaFragment.appendChild(node.cloneNode(true));
      });
    }
    // Title (h3)
    const titleEl = card.querySelector('h3');
    let titleFragment = '';
    if (titleEl) {
      // Use a <strong> or keep as heading (preserve semantic)
      titleFragment = titleEl.cloneNode(true);
    }
    // Compose text cell: meta (optional), title (mandatory)
    const textCellContent = document.createElement('div');
    if (metaFragment) textCellContent.appendChild(metaFragment);
    if (titleFragment) textCellContent.appendChild(titleFragment);
    // If neither, add a blank
    if (!metaFragment && !titleFragment) textCellContent.textContent = '';

    rows.push([imageCell, textCellContent]);
  });

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
