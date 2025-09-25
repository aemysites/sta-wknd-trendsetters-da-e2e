/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // --- COLUMN 1: Main Feature ---
  // Select the first direct child link
  const featureLink = grid.querySelector('a.utility-link-content-block');
  let featureContent = [];
  if (featureLink) {
    // Image
    const imgDiv = featureLink.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    if (imgDiv) {
      const img = imgDiv.querySelector('img');
      if (img) featureContent.push(img);
    }
    // Tag
    const tag = featureLink.querySelector('.tag-group');
    if (tag) featureContent.push(tag);
    // Heading
    const heading = featureLink.querySelector('h3');
    if (heading) featureContent.push(heading);
    // Paragraph
    const para = featureLink.querySelector('p');
    if (para) featureContent.push(para);
  }

  // --- COLUMN 2: Two stacked cards ---
  // Select the first flex-horizontal container
  const flexes = grid.querySelectorAll('.flex-horizontal.flex-vertical.flex-gap-sm');
  let stackedCards = [];
  if (flexes.length > 0) {
    const flex1 = flexes[0];
    const cardLinks = flex1.querySelectorAll('a.utility-link-content-block');
    cardLinks.forEach(cardLink => {
      let cardContent = [];
      // Image
      const imgDiv = cardLink.querySelector('.utility-aspect-3x2');
      if (imgDiv) {
        const img = imgDiv.querySelector('img');
        if (img) cardContent.push(img);
      }
      // Tag
      const tag = cardLink.querySelector('.tag-group');
      if (tag) cardContent.push(tag);
      // Heading
      const heading = cardLink.querySelector('h3');
      if (heading) cardContent.push(heading);
      // Paragraph
      const para = cardLink.querySelector('p');
      if (para) cardContent.push(para);
      // Wrap for vertical stacking
      if (cardContent.length) {
        const cardDiv = document.createElement('div');
        cardDiv.append(...cardContent);
        stackedCards.push(cardDiv);
      }
    });
  }

  // --- COLUMN 3: Vertical list ---
  let verticalList = [];
  if (flexes.length > 1) {
    const flex2 = flexes[1];
    const listLinks = flex2.querySelectorAll('a.utility-link-content-block');
    listLinks.forEach((listLink) => {
      let listContent = [];
      // Heading
      const heading = listLink.querySelector('h3');
      if (heading) listContent.push(heading);
      // Paragraph
      const para = listLink.querySelector('p');
      if (para) listContent.push(para);
      // Wrap for vertical stacking
      if (listContent.length) {
        const itemDiv = document.createElement('div');
        itemDiv.append(...listContent);
        verticalList.push(itemDiv);
      }
    });
  }

  // Compose the table rows
  const headerRow = ['Columns (columns37)'];
  const contentRow = [featureContent, stackedCards, verticalList];

  // Create the table
  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(block);
}
