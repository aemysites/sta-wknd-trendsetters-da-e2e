/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // --- Row 1: Block name ---
  const headerRow = ['Hero (hero25)'];

  // --- Row 2: Background image (optional) ---
  let backgroundCell = '';
  const videoDiv = gridChildren.find(child => child.classList.contains('utility-position-relative'));
  if (videoDiv) {
    const embedDiv = videoDiv.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      const img = embedDiv.querySelector('img');
      if (img) {
        backgroundCell = img;
      }
    }
  }
  const backgroundRow = [backgroundCell || ''];

  // --- Row 3: Title, subheading, CTA ---
  // Title
  let titleElem = '';
  const titleDiv = gridChildren.find(child => child.classList.contains('h1-heading'));
  if (titleDiv) {
    titleElem = titleDiv;
  }
  // Subheading
  let subheadingElem = '';
  const subheadingDiv = gridChildren.find(child => child.querySelector('.subheading'));
  if (subheadingDiv) {
    const subheading = subheadingDiv.querySelector('.subheading');
    if (subheading) subheadingElem = subheading;
  }
  // CTA buttons
  let ctaElems = [];
  const buttonDiv = gridChildren.find(child => child.classList.contains('button-group'));
  if (buttonDiv) {
    ctaElems = Array.from(buttonDiv.querySelectorAll('a'));
  }
  // Compose content cell
  const contentCell = [];
  if (titleElem) contentCell.push(titleElem);
  if (subheadingElem) contentCell.push(subheadingElem);
  if (ctaElems.length) contentCell.push(...ctaElems);
  const contentRow = [contentCell.length ? contentCell : ''];

  // --- Assemble table ---
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
