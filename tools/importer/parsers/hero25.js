/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // --- Extract content ---
  // Main visible headline: .h1-heading (should be a heading element)
  let mainHeadline = grid.querySelector('.h1-heading');
  if (mainHeadline && mainHeadline.tagName !== 'H1' && mainHeadline.tagName !== 'H2' && mainHeadline.tagName !== 'H3') {
    // Convert to <h1>
    const h = document.createElement('h1');
    h.innerHTML = mainHeadline.innerHTML;
    mainHeadline = h;
  }

  // Subheading (paragraph)
  let subheading = null;
  const subheadingDiv = grid.querySelector('.utility-padding-top-2rem');
  if (subheadingDiv) {
    subheading = subheadingDiv.querySelector('p');
  }

  // CTA buttons
  let ctas = [];
  const buttonGroup = grid.querySelector('.button-group');
  if (buttonGroup) {
    ctas = Array.from(buttonGroup.querySelectorAll('a'));
  }

  // Video embed: find .utility-aspect-3x2 > .w-embed-youtubevideo
  let videoLink = '';
  let videoImg = null;
  const videoContainer = grid.querySelector('.utility-aspect-3x2');
  if (videoContainer) {
    const embedBlock = videoContainer.querySelector('.w-embed-youtubevideo');
    if (embedBlock) {
      // Get the placeholder image
      const img = embedBlock.querySelector('img');
      if (img) {
        videoImg = img;
      }
      // Get the iframe src as a link
      const iframe = embedBlock.querySelector('iframe');
      if (iframe && iframe.src) {
        const a = document.createElement('a');
        a.href = iframe.src;
        a.textContent = 'Watch Video';
        videoLink = a;
      }
    }
  }

  // --- Build table rows ---
  const headerRow = ['Hero (hero25)'];

  // Second row: image and video link (background/media)
  const secondRowContent = [];
  if (videoImg) secondRowContent.push(videoImg);
  if (videoLink) secondRowContent.push(videoLink);
  const secondRow = [secondRowContent];

  // Third row: headline, subheading, CTAs
  const thirdRowContent = [];
  if (mainHeadline) thirdRowContent.push(mainHeadline);
  if (subheading) thirdRowContent.push(subheading);
  if (ctas.length) thirdRowContent.push(...ctas);
  const thirdRow = [thirdRowContent];

  // Create table
  const cells = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
