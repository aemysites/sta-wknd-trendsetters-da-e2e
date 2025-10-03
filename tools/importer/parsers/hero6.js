/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (first <img> in the hero)
  const bgImg = element.querySelector('img');

  // Find the card containing the text/CTAs
  const card = element.querySelector('.card');
  const textCtaCell = [];
  if (card) {
    // Heading (h1)
    const h1 = card.querySelector('h1');
    if (h1) textCtaCell.push(h1);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) textCtaCell.push(subheading);
    // CTAs (all <a> inside .button-group)
    const btnGroup = card.querySelector('.button-group');
    if (btnGroup) {
      btnGroup.querySelectorAll('a').forEach((a) => textCtaCell.push(a));
    }
  }

  // Compose the table rows
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg ? bgImg : ''];
  const textRow = [textCtaCell.length ? textCtaCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    textRow,
  ], document);

  element.replaceWith(table);
}
