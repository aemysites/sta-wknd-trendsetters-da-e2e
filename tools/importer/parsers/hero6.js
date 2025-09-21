/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children of a node by tag name
  function getDirectChildByTag(parent, tag) {
    return Array.from(parent.children).find(child => child.tagName.toLowerCase() === tag);
  }

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the image element (background)
  let bgImg = null;
  const gridDiv = getDirectChildByTag(element, 'div'); // .w-layout-grid.grid-layout
  if (gridDiv) {
    // The first child div contains the image
    const imgContainer = gridDiv.children[0];
    if (imgContainer) {
      bgImg = imgContainer.querySelector('img');
    }
  }
  const bgImgRow = [bgImg ? bgImg : ''];

  // 3. Content row (title, subheading, CTA)
  let contentCell = [];
  if (gridDiv && gridDiv.children.length > 1) {
    // The second child div contains the text card
    const textContainer = gridDiv.children[1];
    if (textContainer) {
      // Find the card div
      const cardGrid = getDirectChildByTag(textContainer, 'div');
      if (cardGrid) {
        const card = getDirectChildByTag(cardGrid, 'div');
        if (card) {
          // Get heading, subheading, and button group
          const heading = card.querySelector('h1');
          if (heading) contentCell.push(heading);
          const subheading = card.querySelector('p');
          if (subheading) contentCell.push(subheading);
          const buttonGroup = card.querySelector('.button-group');
          if (buttonGroup) {
            // Add all links in button group
            const links = Array.from(buttonGroup.querySelectorAll('a'));
            if (links.length) contentCell.push(...links);
          }
        }
      }
    }
  }
  const contentRow = [contentCell.length ? contentCell : ''];

  // Compose table
  const rows = [headerRow, bgImgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}
