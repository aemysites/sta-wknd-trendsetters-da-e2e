/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;
  const gridChildren = Array.from(mainGrid.children);
  if (gridChildren.length < 2) return;

  // Left column: image (tart image)
  const leftImageWrapper = gridChildren[0];
  const leftImg = leftImageWrapper.querySelector('img');

  // Right column: card content
  const rightContentWrapper = gridChildren[1];
  const card = rightContentWrapper.querySelector('.card');
  if (!card) return;
  const cardBody = card.querySelector('.card-body');
  if (!cardBody) return;
  const innerGrid = cardBody.querySelector('.grid-layout');
  if (!innerGrid) return;
  const innerGridChildren = Array.from(innerGrid.children);

  // The first child of innerGrid is the text column, the second is the image
  let textCol, rightImg;
  if (innerGridChildren.length === 2) {
    // Some layouts may swap order, so check for image
    if (innerGridChildren[0].querySelector('h2')) {
      textCol = innerGridChildren[0];
      rightImg = innerGridChildren[1].querySelector('img') || innerGridChildren[1];
    } else {
      rightImg = innerGridChildren[0].querySelector('img') || innerGridChildren[0];
      textCol = innerGridChildren[1];
    }
  } else {
    // fallback: try to find textCol and rightImg
    textCol = innerGrid.querySelector('h2')?.parentElement;
    rightImg = innerGrid.querySelector('img');
  }

  // Compose left column: left image
  const leftCol = leftImg ? leftImg.cloneNode(true) : '';

  // Compose right column: all text content plus right image
  const rightColFragment = document.createElement('div');
  if (textCol) {
    Array.from(textCol.childNodes).forEach(node => {
      rightColFragment.appendChild(node.cloneNode(true));
    });
  }
  if (rightImg) {
    rightColFragment.appendChild(rightImg.cloneNode(true));
  }

  // Table header must match block name exactly
  const headerRow = ['Columns block (columns13)'];
  const rows = [
    headerRow,
    [leftCol, rightColFragment]
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
