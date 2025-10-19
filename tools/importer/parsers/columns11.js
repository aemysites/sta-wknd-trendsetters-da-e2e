/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children divs of a container
  function getDirectDivs(parent) {
    return Array.from(parent.children).filter((el) => el.tagName === 'DIV');
  }

  // Find main container (skip section wrapper)
  let container = element;
  if (container.classList.contains('section')) {
    container = container.querySelector('.container') || container;
  }

  // Get the first grid (top content) and second grid (images)
  const grids = container.querySelectorAll('.grid-layout');
  const topGrid = grids[0];
  const imageGrid = grids[1];

  // --- Top left: Eyebrow + Headline ---
  let eyebrow = '';
  let headline = '';
  if (topGrid) {
    const leftCol = getDirectDivs(topGrid)[0];
    if (leftCol) {
      const eyebrowEl = leftCol.querySelector('.eyebrow');
      if (eyebrowEl) eyebrow = eyebrowEl.textContent.trim();
      const headlineEl = leftCol.querySelector('h1');
      if (headlineEl) headline = headlineEl.textContent.trim();
    }
  }

  // --- Top right: Description, author, button, avatar, author meta ---
  let description = '';
  let authorName = '';
  let authorDate = '';
  let authorDot = '';
  let authorRead = '';
  let avatarImg = null;
  let button = null;
  if (topGrid) {
    const rightCol = getDirectDivs(topGrid)[1];
    if (rightCol) {
      const descEl = rightCol.querySelector('.rich-text, .w-richtext');
      if (descEl) description = descEl.textContent.trim();
      // Author info: avatar, name, date, read time
      const metaGrid = rightCol.querySelector('.grid-layout');
      if (metaGrid) {
        const metaDivs = getDirectDivs(metaGrid);
        if (metaDivs[0]) {
          avatarImg = metaDivs[0].querySelector('img');
        }
        if (metaDivs[1]) {
          const nameEl = metaDivs[1].querySelector('.paragraph-sm:not(.utility-text-secondary)');
          if (nameEl) authorName = nameEl.textContent.trim();
          const metaRow = metaDivs[1].querySelectorAll('.utility-text-secondary');
          if (metaRow.length >= 3) {
            authorDate = metaRow[0].textContent.trim();
            authorDot = metaRow[1].textContent.trim();
            authorRead = metaRow[2].textContent.trim();
          }
        }
      }
      button = rightCol.querySelector('a.button, .w-button');
    }
  }

  // --- Image grid (bottom row) ---
  let img1 = null;
  let img2 = null;
  if (imageGrid) {
    const imgDivs = getDirectDivs(imageGrid);
    if (imgDivs[0]) {
      img1 = imgDivs[0].querySelector('img');
    }
    if (imgDivs[1]) {
      img2 = imgDivs[1].querySelector('img');
    }
  }

  // --- Build table rows ---
  const headerRow = ['Columns (columns11)'];

  // Second row: left = eyebrow + headline, right = description + author + button
  const leftCell = [];
  if (eyebrow) leftCell.push(document.createTextNode(eyebrow));
  if (headline) leftCell.push(document.createTextNode(headline));

  const rightCell = [];
  if (description) rightCell.push(document.createTextNode(description));
  // Author info block (all text, avatar)
  if (avatarImg || authorName || authorDate || authorDot || authorRead) {
    const authorBlock = document.createElement('div');
    if (avatarImg) authorBlock.appendChild(avatarImg.cloneNode(true));
    const authorText = [authorName, authorDate, authorDot, authorRead].filter(Boolean).join(' ');
    if (authorText) authorBlock.appendChild(document.createTextNode(authorText));
    rightCell.push(authorBlock);
  }
  if (button) rightCell.push(button.cloneNode(true));

  // Third row: two columns, images (main images only)
  const imageRow = [];
  imageRow.push(img1 ? img1.cloneNode(true) : '');
  imageRow.push(img2 ? img2.cloneNode(true) : '');

  // Assemble table
  const cells = [
    headerRow,
    [leftCell, rightCell],
    imageRow
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
