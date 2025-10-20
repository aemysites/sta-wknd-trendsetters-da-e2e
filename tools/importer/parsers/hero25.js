/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find the main grid container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // --- ROW 1: Block Name ---
  const headerRow = ['Hero (hero25)'];

  // --- ROW 2: Background Image or Video Embed ---
  let mediaCell = '';
  const videoWrap = grid.querySelector('.utility-position-relative');
  if (videoWrap) {
    const embedDiv = videoWrap.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      const img = embedDiv.querySelector('img');
      const iframe = embedDiv.querySelector('iframe');
      let mediaContent = [];
      if (img) mediaContent.push(img);
      if (iframe && iframe.src) {
        const videoLink = document.createElement('a');
        videoLink.href = iframe.src;
        videoLink.textContent = 'Watch Video';
        videoLink.target = '_blank';
        mediaContent.push(document.createElement('br'), videoLink);
      }
      mediaCell = mediaContent.length ? mediaContent : '';
    }
  }

  // --- ROW 3: Text Content & CTAs ---
  const textContent = [];

  // Include visually hidden heading for accessibility
  const srHeading = grid.querySelector('.utility-screen-reader-visible-only');
  if (srHeading) {
    const h1 = document.createElement('h1');
    h1.textContent = srHeading.textContent;
    h1.setAttribute('aria-hidden', 'true');
    h1.style.position = 'absolute';
    h1.style.left = '-9999px';
    textContent.push(h1);
  }

  // Main visible heading
  const headingDiv = grid.querySelector('.h1-heading');
  if (headingDiv) {
    const h1 = document.createElement('h1');
    h1.innerHTML = headingDiv.innerHTML;
    textContent.push(h1);
  }

  // Subheading/paragraph
  const paraDiv = grid.querySelector('.utility-padding-top-2rem');
  if (paraDiv) {
    const para = paraDiv.querySelector('p');
    if (para) textContent.push(para);
  }

  // CTA buttons
  const buttonGroup = grid.querySelector('.button-group');
  if (buttonGroup) {
    const buttons = Array.from(buttonGroup.querySelectorAll('a'));
    if (buttons.length) {
      const btnDiv = document.createElement('div');
      buttons.forEach(btn => btnDiv.appendChild(btn));
      textContent.push(btnDiv);
    }
  }

  // Compose the table rows
  const cells = [
    headerRow,
    [mediaCell],
    [textContent]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
