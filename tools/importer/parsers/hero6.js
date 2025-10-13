/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid layout divs
  const gridDivs = element.querySelectorAll('.grid-layout');

  // Extract background image
  let imgEl = null;
  if (gridDivs.length > 0) {
    const bgImg = gridDivs[0].querySelector('img');
    if (bgImg) imgEl = bgImg.cloneNode(true);
  }

  // Extract card content (heading, subheading, CTAs)
  let heading = null;
  let subheading = null;
  let buttonGroup = null;
  if (gridDivs.length > 1) {
    const card = gridDivs[1].querySelector('.card');
    if (card) {
      heading = card.querySelector('h1');
      subheading = card.querySelector('p');
      buttonGroup = card.querySelector('.button-group');
    }
  }

  // Compose the text cell (must include all text and CTA links)
  const textCellContent = [];
  if (heading) textCellContent.push(heading.cloneNode(true));
  if (subheading) textCellContent.push(subheading.cloneNode(true));
  if (buttonGroup) {
    const ctas = buttonGroup.querySelectorAll('a');
    ctas.forEach(a => textCellContent.push(a.cloneNode(true)));
  }

  // Table rows
  const headerRow = ['Hero (hero6)'];
  const imageRow = [imgEl ? imgEl : ''];
  const textRow = [textCellContent.length ? textCellContent : ''];

  // Create table
  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
