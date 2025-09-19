/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children divs
  const topDivs = element.querySelectorAll(':scope > div');

  // HEADER ROW
  const headerRow = ['Hero (hero14)'];

  // ROW 2: Background image (optional)
  // There is no image in the source HTML, so this row will be empty
  const backgroundRow = [''];

  // ROW 3: Content (title, subheading, CTA)
  // Find the grid-layout div
  let contentRowCell = document.createElement('div');
  // Defensive: find the grid-layout div
  let gridDiv = null;
  for (const div of topDivs) {
    if (div.classList.contains('w-layout-grid')) {
      gridDiv = div;
      break;
    }
  }
  if (gridDiv) {
    // Get heading (h2)
    const heading = gridDiv.querySelector('h2');
    // Get the right-side content div (contains paragraph and CTA)
    const contentDiv = gridDiv.querySelector('div');
    let paragraph = null;
    let cta = null;
    if (contentDiv) {
      paragraph = contentDiv.querySelector('p');
      cta = contentDiv.querySelector('a');
    }
    // Append all found elements to the cell
    if (heading) contentRowCell.appendChild(heading);
    if (paragraph) contentRowCell.appendChild(paragraph);
    if (cta) contentRowCell.appendChild(cta);
  } else {
    // Fallback: append all children
    Array.from(element.children).forEach((child) => {
      contentRowCell.appendChild(child);
    });
  }

  // Compose table rows
  const rows = [
    headerRow,
    backgroundRow,
    [contentRowCell],
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element with block
  element.replaceWith(block);
}
