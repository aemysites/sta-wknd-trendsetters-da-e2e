/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name
  const headerRow = ['Hero (hero5)'];

  // 2. Find the main image (background/visual anchor)
  // Look for the first <img> inside the element
  const img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // 3. Find the text content and CTA(s)
  // The main content is in a nested grid > section
  let contentSection = null;
  const gridDivs = element.querySelectorAll(':scope > div > div');
  for (const div of gridDivs) {
    if (div.classList.contains('section')) {
      contentSection = div;
      break;
    }
  }
  // Defensive fallback: if not found, try the first grid child
  if (!contentSection) {
    const fallback = element.querySelector(':scope > div > div');
    if (fallback) contentSection = fallback;
  }

  // Prepare content cell: heading, paragraph, buttons
  const contentCell = [];
  if (contentSection) {
    // Heading
    const heading = contentSection.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentCell.push(heading);

    // Subheading/paragraph
    const para = contentSection.querySelector('div.rich-text, p');
    if (para) contentCell.push(para);

    // CTA buttons
    const buttonGroup = contentSection.querySelector('.button-group');
    if (buttonGroup) {
      // Move all buttons into the cell
      const buttons = Array.from(buttonGroup.querySelectorAll('a, button'));
      if (buttons.length) {
        const btnDiv = document.createElement('div');
        btnDiv.append(...buttons);
        contentCell.push(btnDiv);
      }
    }
  }
  const contentRow = [contentCell];

  // 4. Assemble the table
  const rows = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 5. Replace the original element
  element.replaceWith(table);
}
