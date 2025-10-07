/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children divs
  const topLevelDivs = element.querySelectorAll(':scope > div');

  // The first main grid: headline, eyebrow, description, author, button
  const mainGrid = topLevelDivs[0]?.querySelector('.grid-layout');
  // The second grid: two images side by side
  const imageGrid = topLevelDivs[1]?.querySelector('.grid-layout');

  // --- Left column (headline, eyebrow) ---
  let leftCol = document.createElement('div');
  if (mainGrid && mainGrid.children[0]) {
    const left = mainGrid.children[0];
    // Eyebrow
    const eyebrow = left.querySelector('.eyebrow');
    if (eyebrow) leftCol.appendChild(eyebrow.cloneNode(true));
    // Headline
    const headline = left.querySelector('h1');
    if (headline) leftCol.appendChild(headline.cloneNode(true));
  }

  // --- Right column (description, author, button) ---
  let rightCol = document.createElement('div');
  if (mainGrid && mainGrid.children[1]) {
    const right = mainGrid.children[1];
    // Description paragraph
    const desc = right.querySelector('.rich-text');
    if (desc) rightCol.appendChild(desc.cloneNode(true));
    // Author/avatar block
    const authorBlock = right.querySelector('.grid-layout');
    if (authorBlock) {
      // Avatar
      const avatar = authorBlock.querySelector('.avatar img');
      if (avatar) rightCol.appendChild(avatar.cloneNode(true));
      // Author name
      const authorName = authorBlock.querySelector('.paragraph-sm:not(.utility-text-secondary)');
      if (authorName) rightCol.appendChild(authorName.cloneNode(true));
      // Date and read time
      const metaDetails = authorBlock.querySelectorAll('.utility-text-secondary');
      if (metaDetails && metaDetails.length) {
        const metaWrapper = document.createElement('span');
        metaDetails.forEach((el, i) => {
          metaWrapper.appendChild(el.cloneNode(true));
          if (i < metaDetails.length - 1) metaWrapper.appendChild(document.createTextNode(' '));
        });
        rightCol.appendChild(metaWrapper);
      }
    }
    // Read more button
    const button = right.querySelector('a.button');
    if (button) rightCol.appendChild(button.cloneNode(true));
  }

  // --- Bottom row: two images ---
  let image1Cell = '';
  let image2Cell = '';
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll('.utility-aspect-1x1');
    if (imgDivs[0]) {
      const img = imgDivs[0].querySelector('img');
      if (img) image1Cell = img.cloneNode(true);
    }
    if (imgDivs[1]) {
      const img = imgDivs[1].querySelector('img');
      if (img) image2Cell = img.cloneNode(true);
    }
  }

  // Compose the table rows
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftCol, rightCol];
  const imagesRow = [image1Cell, image2Cell];

  // Always add the image row for this block (even if empty, to match screenshot structure)
  const cells = [headerRow, contentRow, imagesRow];

  // Build the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
