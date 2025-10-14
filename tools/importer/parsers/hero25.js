/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero25)'];

  // --- Find the background image or embed ---
  let backgroundCell = '';
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    const embedWrapper = grid.querySelector('.w-embed-youtubevideo');
    if (embedWrapper) {
      const cellContent = [];
      // Add image if present
      const img = embedWrapper.querySelector('img');
      if (img) cellContent.push(img.cloneNode(true));
      // Replace iframe with a link (not the iframe itself)
      const iframe = embedWrapper.querySelector('iframe');
      if (iframe && iframe.src) {
        const a = document.createElement('a');
        a.href = iframe.src;
        a.textContent = iframe.src;
        cellContent.push(a);
      }
      backgroundCell = cellContent;
    }
  }

  // --- Compose the content cell (heading, subheading, CTAs) ---
  const contentCell = [];
  if (grid) {
    // Heading: visually prominent only (h1-heading)
    const headingDiv = grid.querySelector('.h1-heading');
    if (headingDiv) {
      const h1 = document.createElement('h1');
      h1.textContent = headingDiv.textContent;
      contentCell.push(h1);
    }
    // Subheading: get all <p> elements inside grid
    const paragraphs = grid.querySelectorAll('p');
    paragraphs.forEach(p => {
      contentCell.push(p.cloneNode(true));
    });
    // CTA buttons: include all <a> elements inside button group
    const buttonGroup = grid.querySelector('.button-group');
    if (buttonGroup) {
      const buttons = buttonGroup.querySelectorAll('a');
      buttons.forEach(btn => contentCell.push(btn.cloneNode(true)));
    }
    // Do NOT include visually hidden heading (screen reader only)
  }

  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
