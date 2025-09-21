/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row
  const headerRow = ['Columns (columns11)'];

  // 2. Find the main grid for headline/description
  const container = element.querySelector('.container');
  const mainGrid = container && container.querySelector('.grid-layout.tablet-1-column');
  let leftColContent = '', rightColContent = '';
  if (mainGrid) {
    const gridChildren = getDirectChildren(mainGrid, 'div');
    // Left column: eyebrow + headline
    if (gridChildren[0]) {
      let leftParts = [];
      const eyebrow = gridChildren[0].querySelector('.eyebrow');
      if (eyebrow) leftParts.push(eyebrow.textContent.trim());
      const headline = gridChildren[0].querySelector('h1');
      if (headline) leftParts.push(headline.textContent.trim());
      leftColContent = leftParts.join('\n');
    }
    // Right column: description, author, button
    if (gridChildren[1]) {
      let rightParts = [];
      const desc = gridChildren[1].querySelector('.rich-text');
      if (desc) rightParts.push(desc.textContent.trim());
      const authorBlock = gridChildren[1].querySelector('.flex-horizontal.y-center.flex-gap-xs');
      if (authorBlock) {
        // Avatar image
        const avatarImg = authorBlock.querySelector('.avatar img');
        if (avatarImg) {
          const imgEl = document.createElement('img');
          imgEl.src = avatarImg.src;
          imgEl.alt = avatarImg.alt || '';
          imgEl.width = avatarImg.width || '';
          imgEl.height = avatarImg.height || '';
          rightParts.push(imgEl);
        }
        // Author name
        const authorName = authorBlock.querySelector('.paragraph-sm:not(.utility-text-secondary)');
        if (authorName) rightParts.push(authorName.textContent.trim());
        // Date and read time
        const meta = authorBlock.querySelectorAll('.utility-text-secondary');
        if (meta.length > 0) {
          let metaText = Array.from(meta).map(m => m.textContent.trim()).join(' ');
          rightParts.push(metaText);
        }
      }
      // Button
      const btn = gridChildren[1].querySelector('a.button');
      if (btn) {
        const btnEl = document.createElement('a');
        btnEl.href = btn.href;
        btnEl.textContent = btn.textContent.trim();
        btnEl.className = 'button';
        rightParts.push(btnEl);
      }
      rightColContent = rightParts;
    }
  }

  // 3. Images grid (bottom)
  const imagesGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imgCell1 = '', imgCell2 = '';
  if (imagesGrid) {
    const imgDivs = getDirectChildren(imagesGrid, 'div');
    if (imgDivs[0]) {
      const img1 = imgDivs[0].querySelector('img');
      if (img1) {
        const imgEl1 = document.createElement('img');
        imgEl1.src = img1.src;
        imgEl1.alt = img1.alt || '';
        imgEl1.width = img1.width || '';
        imgEl1.height = img1.height || '';
        imgCell1 = imgEl1;
      }
    }
    if (imgDivs[1]) {
      const img2 = imgDivs[1].querySelector('img');
      if (img2) {
        const imgEl2 = document.createElement('img');
        imgEl2.src = img2.src;
        imgEl2.alt = img2.alt || '';
        imgEl2.width = img2.width || '';
        imgEl2.height = img2.height || '';
        imgCell2 = imgEl2;
      }
    }
  }

  // 4. Compose table rows
  // Second row: left column text, right column (array of nodes)
  const secondRow = [leftColContent, rightColContent];
  // Third row: images
  const thirdRow = [imgCell1, imgCell2];

  // 5. Build table
  const rows = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // 6. Replace element
  element.replaceWith(table);
}
