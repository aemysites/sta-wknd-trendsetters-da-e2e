/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const gridDiv = element.querySelector('.grid-layout');
  if (!gridDiv) return;

  // Find the background image: the first <img> inside gridDiv
  const img = gridDiv.querySelector('img');
  // Reference the existing image element if present
  const imageCell = img ? img : '';

  // Find the text container (usually has .container)
  const textContainer = gridDiv.querySelector('.container');
  let textCellContent = [];
  if (textContainer) {
    // Find the main heading (h1)
    const heading = textContainer.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) {
      textCellContent.push(heading);
      // Find subheading: next heading after main heading
      let subheading = null;
      let next = heading.nextElementSibling;
      while (next) {
        if (/^H[2-6]$/.test(next.tagName)) {
          subheading = next;
          break;
        }
        next = next.nextElementSibling;
      }
      if (subheading) textCellContent.push(subheading);
    }
    // Find CTA (button or link)
    const cta = textContainer.querySelector('a, button');
    if (cta) textCellContent.push(cta);
    // If no heading found, include all child nodes
    if (textCellContent.length === 0) {
      textCellContent = Array.from(textContainer.childNodes);
    }
  }
  // If no textContainer, leave cell empty
  const textCell = textCellContent.length ? textCellContent : '';

  // Table rows
  const headerRow = ['Hero (hero29)'];
  const imageRow = [imageCell];
  const textRow = [textCell];
  const cells = [headerRow, imageRow, textRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
