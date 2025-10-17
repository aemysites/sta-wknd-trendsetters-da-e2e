/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Columns (columns11)'];

  // Get the main grid (top part) and the images grid (bottom part)
  const grids = element.querySelectorAll('.w-layout-grid');
  const topGrid = grids[0];
  const imagesGrid = grids[1];

  // --- LEFT COLUMN (headline, eyebrow) ---
  let leftCol = '';
  if (topGrid && topGrid.children[0]) {
    // Only keep eyebrow and h1
    const leftClone = topGrid.children[0].cloneNode(true);
    // Remove anything that's not eyebrow or h1
    [...leftClone.children].forEach(child => {
      if (!child.classList.contains('eyebrow') && child.tagName !== 'H1') {
        child.remove();
      }
    });
    leftCol = leftClone;
  }

  // --- RIGHT COLUMN (desc, author, button) ---
  let rightCol = '';
  if (topGrid && topGrid.children[1]) {
    // Compose rightCol: paragraph, author profile (avatar, name, meta), and button
    const right = topGrid.children[1];
    const frag = document.createDocumentFragment();
    // Paragraph
    const para = right.querySelector('.rich-text, .paragraph-lg, p');
    if (para) frag.appendChild(para.cloneNode(true));
    // Author profile (avatar, name, meta)
    const authorRow = right.querySelector('.flex-horizontal.y-center.flex-gap-xs');
    if (authorRow) {
      frag.appendChild(authorRow.cloneNode(true));
    }
    // Button
    const button = right.querySelector('.button');
    if (button) frag.appendChild(button.cloneNode(true));
    rightCol = frag;
  }

  // --- BOTTOM IMAGES ---
  let img1 = '', img2 = '';
  if (imagesGrid && imagesGrid.children.length >= 2) {
    const imgCol1 = imagesGrid.children[0];
    const imgCol2 = imagesGrid.children[1];
    const imgEl1 = imgCol1.querySelector('img');
    const imgEl2 = imgCol2.querySelector('img');
    img1 = imgEl1 ? imgEl1.cloneNode(true) : '';
    img2 = imgEl2 ? imgEl2.cloneNode(true) : '';
  }

  const tableCells = [
    headerRow,
    [leftCol, rightCol],
    [img1, img2]
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
