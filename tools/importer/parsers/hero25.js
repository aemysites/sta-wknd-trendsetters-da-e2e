/* global WebImporter */
export default function parse(element, { document }) {
  // --- 1. HEADER ROW ---
  const headerRow = ['Hero (hero25)'];

  // --- 2. IMAGE/EMBED ROW ---
  // Find the video embed container
  let embedCell = '';
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    const videoDiv = grid.querySelector('.w-embed-youtubevideo');
    if (videoDiv) {
      // Only reference existing image element (not clone)
      const img = videoDiv.querySelector('img');
      // Only reference existing iframe element
      const iframe = videoDiv.querySelector('iframe');
      const cellContent = [];
      if (img) cellContent.push(img); // reference
      if (iframe && iframe.src) {
        // Create a link to the video (not embed)
        const videoLink = document.createElement('a');
        videoLink.href = iframe.src;
        videoLink.textContent = 'Watch video';
        cellContent.push(document.createElement('br'), videoLink);
      }
      embedCell = cellContent.length ? cellContent : '';
    }
  }

  // --- 3. TEXT + CTA ROW ---
  // Find headline, subheading, and button group
  let headline = null;
  let subheading = null;
  let buttonGroup = null;
  if (grid) {
    // Headline: .h1-heading
    headline = grid.querySelector('.h1-heading');
    // Subheading: .utility-padding-top-2rem > p
    const subDiv = grid.querySelector('.utility-padding-top-2rem');
    if (subDiv) {
      subheading = subDiv.querySelector('p') || subDiv;
    }
    // Buttons: .button-group
    buttonGroup = grid.querySelector('.button-group');
  }
  // Compose cell content
  const textCtaCell = [];
  if (headline) textCtaCell.push(headline); // reference
  if (subheading) textCtaCell.push(subheading); // reference
  if (buttonGroup) textCtaCell.push(buttonGroup); // reference

  // --- Assemble Table ---
  const rows = [
    headerRow,
    [embedCell],
    [textCtaCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
