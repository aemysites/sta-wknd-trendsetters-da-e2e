/* global WebImporter */
export default function parse(element, { document }) {
  // --- Extract grid columns ---
  const gridDivs = element.querySelectorAll(':scope .grid-layout > *');

  // --- Extract background image (video embed placeholder) and video link ---
  let backgroundCellContent = [];
  const embedDiv = Array.from(gridDivs).find(div => div.querySelector('iframe'));
  if (embedDiv) {
    // Try to get the placeholder image (img inside embed)
    const img = embedDiv.querySelector('img');
    if (img) backgroundCellContent.push(img);
    // Get the iframe src and make a link
    const iframe = embedDiv.querySelector('iframe');
    if (iframe && iframe.src) {
      const videoLink = document.createElement('a');
      videoLink.href = iframe.src;
      videoLink.textContent = 'Watch video';
      backgroundCellContent.push(videoLink);
    }
  }
  if (backgroundCellContent.length === 0) backgroundCellContent = [null];

  // --- Extract title (visual headline) ---
  let titleDiv = Array.from(gridDivs).find(div => div.classList.contains('h1-heading'));

  // --- Extract subheading ---
  let subheadingP = null;
  const subheadingDiv = Array.from(gridDivs).find(div => div.querySelector('.subheading'));
  if (subheadingDiv) {
    subheadingP = subheadingDiv.querySelector('.subheading');
  }

  // --- Extract CTA buttons ---
  let ctaDiv = Array.from(gridDivs).find(div => div.classList.contains('button-group'));

  // --- Compose content cell ---
  const contentCell = [];
  // Only include the visible headline (not the visually hidden h1)
  if (titleDiv) contentCell.push(titleDiv);
  if (subheadingP) contentCell.push(subheadingP);
  if (ctaDiv) contentCell.push(ctaDiv);

  // --- Build table ---
  const rows = [
    ['Hero (hero25)'],
    [backgroundCellContent],
    [contentCell]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
