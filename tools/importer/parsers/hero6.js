/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: must match block name exactly
  const headerRow = ['Hero (hero6)'];

  // 2. Extract the background image (first <img> in hero)
  const bgImg = element.querySelector('img');
  let imageRow = [''];
  if (bgImg) {
    imageRow = [bgImg]; // Reference the existing <img> element
  }

  // 3. Extract the content card (heading, subheading, CTAs)
  const card = element.querySelector('.card');
  let contentRow = [''];
  if (card) {
    const content = [];
    // Heading (h1)
    const heading = card.querySelector('h1');
    if (heading) content.push(heading);
    // Subheading (p)
    const subheading = card.querySelector('p');
    if (subheading) content.push(subheading);
    // CTA buttons (button group)
    const btnGroup = card.querySelector('.button-group');
    if (btnGroup) content.push(btnGroup);
    if (content.length > 0) {
      contentRow = [content]; // All content in a single cell
    }
  }

  // 4. Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow,
  ], document);

  // 5. Replace the original element with the table
  element.replaceWith(table);
}
