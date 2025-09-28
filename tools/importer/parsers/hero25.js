/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout div
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // --- Row 1: Block name ---
  const headerRow = ['Hero (hero25)'];

  // --- Row 2: Background image or video ---
  let bgCell = '';
  const videoDiv = grid.querySelector('.utility-position-relative');
  if (videoDiv) {
    const embedDiv = videoDiv.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      const img = embedDiv.querySelector('img');
      if (img) {
        bgCell = img.cloneNode(true);
      }
      const iframe = embedDiv.querySelector('iframe');
      if (iframe && iframe.src) {
        const videoLink = document.createElement('a');
        videoLink.href = iframe.src;
        videoLink.textContent = 'Watch video';
        if (bgCell) {
          bgCell = [bgCell, videoLink];
        } else {
          bgCell = videoLink;
        }
      }
    }
  }
  if (!bgCell) bgCell = '';

  // --- Row 3: Title, subheading, CTA ---
  const contentCell = [];
  const titleDiv = grid.querySelector('.h1-heading');
  if (titleDiv) {
    const h1 = document.createElement('h1');
    h1.textContent = titleDiv.textContent;
    contentCell.push(h1);
  }
  const subheadingDiv = grid.querySelector('.subheading');
  if (subheadingDiv) {
    const p = document.createElement('p');
    p.textContent = subheadingDiv.textContent;
    contentCell.push(p);
  }
  const buttonGroup = grid.querySelector('.button-group');
  if (buttonGroup) {
    const buttons = Array.from(buttonGroup.querySelectorAll('a')).map(a => a.cloneNode(true));
    if (buttons.length) {
      const btnWrapper = document.createElement('div');
      buttons.forEach(btn => btnWrapper.appendChild(btn));
      contentCell.push(btnWrapper);
    }
  }
  if (!contentCell.length) contentCell.push('');

  // Build table rows
  const cells = [
    headerRow,
    [bgCell],
    [contentCell],
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
