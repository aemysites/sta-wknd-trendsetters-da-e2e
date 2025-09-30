/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to create a link from an iframe src
  function createLinkFromIframe(iframe) {
    if (!iframe || !iframe.src) return null;
    const a = document.createElement('a');
    a.href = iframe.src;
    a.textContent = iframe.src;
    return a;
  }

  // 1. Get the grid container (main content)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Find the video/image background (row 2)
  let backgroundAsset = null;
  const videoDiv = grid.querySelector('.w-embed-youtubevideo');
  if (videoDiv) {
    // If there's an img, use it as the background asset
    const img = videoDiv.querySelector('img');
    if (img) {
      backgroundAsset = img.cloneNode(true);
    } else {
      // If there's an iframe (YouTube), create a link
      const iframe = videoDiv.querySelector('iframe');
      const link = createLinkFromIframe(iframe);
      if (link) backgroundAsset = link;
    }
  }

  // 3. Find the title, subheading, and CTA (row 3)
  // Title: .h1-heading
  const title = grid.querySelector('.h1-heading');
  // Subheading: .subheading (inside a <p>)
  const subheadingDiv = grid.querySelector('.utility-padding-top-2rem');
  let subheading = null;
  if (subheadingDiv) {
    subheading = subheadingDiv.querySelector('p') || subheadingDiv;
  }
  // CTA: .button-group (contains <a>)
  const cta = grid.querySelector('.button-group');

  // Compose content for row 3
  const contentRow = document.createElement('div');
  if (title) contentRow.appendChild(title.cloneNode(true));
  if (subheading) contentRow.appendChild(subheading.cloneNode(true));
  if (cta) contentRow.appendChild(cta.cloneNode(true));

  // FLEXIBILITY: Also include any text content from direct children of grid not already captured
  const usedNodes = new Set([title, subheadingDiv, cta, videoDiv]);
  Array.from(grid.children).forEach(child => {
    if (!usedNodes.has(child) && child.textContent.trim()) {
      // Only add if not already included
      contentRow.appendChild(child.cloneNode(true));
    }
  });

  // EXTRA FLEXIBILITY: Also include any text nodes directly under grid (not inside elements)
  Array.from(grid.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      contentRow.appendChild(document.createTextNode(node.textContent));
    }
  });

  // Build the table rows
  const headerRow = ['Hero (hero25)'];
  const backgroundRow = [backgroundAsset ? backgroundAsset : ''];
  const contentRowArr = [contentRow.childNodes.length ? contentRow : ''];

  const cells = [headerRow, backgroundRow, contentRowArr];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
