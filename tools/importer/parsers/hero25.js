/* global WebImporter */
export default function parse(element, { document }) {
  // --- HEADER ROW ---
  const headerRow = ['Hero (hero25)'];

  // --- ROW 2: Background Image (optional) ---
  // In this source, the hero uses a video (YouTube iframe) as the prominent background visual.
  // Per requirements, if not an image, add a link to the video.
  let backgroundCell = '';
  // Find the iframe (YouTube video)
  const iframe = element.querySelector('iframe');
  if (iframe && iframe.src) {
    // Create a link to the video
    const videoLink = document.createElement('a');
    videoLink.href = iframe.src;
    videoLink.textContent = iframe.title || 'Watch video';
    backgroundCell = videoLink;
  }

  // --- ROW 3: Title, Subheading, CTA(s) ---
  // Find the heading
  const grid = element.querySelector('.grid-layout');
  let title = '', subheading = '', ctas = '';
  if (grid) {
    // Title: div with class 'h1-heading'
    const titleDiv = grid.querySelector('.h1-heading');
    if (titleDiv) {
      // Use as an <h1> for semantics
      const h1 = document.createElement('h1');
      h1.textContent = titleDiv.textContent;
      title = h1;
    }
    // Subheading: .utility-padding-top-2rem > p
    const subDiv = grid.querySelector('.utility-padding-top-2rem');
    if (subDiv && subDiv.querySelector('p')) {
      subheading = subDiv.querySelector('p');
    }
    // CTAs: .button-group
    const buttonGroup = grid.querySelector('.button-group');
    if (buttonGroup) {
      // Use the existing button group div, which contains the CTAs
      ctas = buttonGroup;
    }
  }

  // Compose the content cell for row 3
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (ctas) contentCell.push(ctas);

  // --- BUILD TABLE ---
  const rows = [
    headerRow,
    [backgroundCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
