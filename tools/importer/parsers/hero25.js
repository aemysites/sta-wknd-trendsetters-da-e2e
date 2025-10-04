/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get direct children divs of the grid-layout
  const grid = element.querySelector('.grid-layout');
  const gridChildren = grid ? Array.from(grid.children) : [];

  // --- Row 1: Block Name ---
  const headerRow = ['Hero (hero25)'];

  // --- Row 2: Background Image or Video (optional) ---
  // Find the video/image container (contains img and iframe)
  let backgroundCell = '';
  const videoDiv = gridChildren.find(div => div.querySelector('.w-embed-youtubevideo'));
  if (videoDiv) {
    const embedDiv = videoDiv.querySelector('.w-embed-youtubevideo');
    // If there's an image, use it as background asset
    const img = embedDiv.querySelector('img');
    if (img) {
      backgroundCell = img;
    }
    // If there's an iframe, include a link to the video
    const iframe = embedDiv.querySelector('iframe');
    if (iframe && iframe.src) {
      // Only add the link if not already using image
      const videoLink = document.createElement('a');
      videoLink.href = iframe.src;
      videoLink.textContent = 'Watch Video';
      if (backgroundCell) {
        backgroundCell = [backgroundCell, videoLink];
      } else {
        backgroundCell = videoLink;
      }
    }
  }
  // Defensive: If nothing found, leave cell blank
  const backgroundRow = [backgroundCell || ''];

  // --- Row 3: Title, Subheading, CTA ---
  // Find heading, subheading, and button group
  let title = '';
  let subheading = '';
  let ctaGroup = '';

  // Title (h1 or styled div)
  // Prefer visually prominent heading (the styled div)
  const headingDiv = gridChildren.find(div => div.classList.contains('h1-heading'));
  if (headingDiv) {
    title = headingDiv;
  } else {
    // Fallback to h1
    const h1 = gridChildren.find(child => child.tagName === 'H1');
    if (h1) title = h1;
  }
  // Subheading (p.subheading)
  const subDiv = gridChildren.find(div => div.querySelector('p.subheading'));
  if (subDiv) {
    const p = subDiv.querySelector('p.subheading');
    if (p) subheading = p;
  }
  // CTA (button group)
  const buttonDiv = gridChildren.find(div => div.classList.contains('button-group'));
  if (buttonDiv) {
    ctaGroup = buttonDiv;
  }

  // Compose content cell
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (ctaGroup) contentCell.push(ctaGroup);
  const contentRow = [contentCell.length ? contentCell : ''];

  // --- Build table ---
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
