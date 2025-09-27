/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout container
  const grid = element.querySelector('.w-layout-grid');
  let backgroundAsset = '';
  let contentCell = document.createElement('div');

  if (grid) {
    // --- Background Asset (Video or Image) ---
    // Look for a video or image embed
    const videoDiv = grid.querySelector('.utility-position-relative, .w-embed-youtubevideo');
    if (videoDiv) {
      // Prefer iframe (YouTube), else fallback to image
      const iframe = videoDiv.querySelector('iframe');
      if (iframe && iframe.src) {
        // Reference the iframe as a link (not as a new element)
        const link = document.createElement('a');
        link.href = iframe.src;
        link.textContent = 'Video';
        backgroundAsset = link;
      } else {
        // Fallback: reference the image
        const img = videoDiv.querySelector('img');
        if (img) backgroundAsset = img;
      }
    }

    // --- Title (Heading) ---
    const titleDiv = grid.querySelector('.h1-heading');
    if (titleDiv) {
      // Wrap in <h1> for semantic meaning
      const h1 = document.createElement('h1');
      h1.textContent = titleDiv.textContent.trim();
      contentCell.appendChild(h1);
    }

    // --- Subheading (Paragraph) ---
    const subheadingDiv = grid.querySelector('p.subheading');
    if (subheadingDiv) {
      const p = document.createElement('p');
      p.textContent = subheadingDiv.textContent.trim();
      contentCell.appendChild(p);
    }

    // --- CTA Group (Buttons) ---
    const ctaGroup = grid.querySelector('.button-group');
    if (ctaGroup) {
      // Reference the actual anchor elements (do not clone)
      Array.from(ctaGroup.querySelectorAll('a')).forEach((cta) => {
        contentCell.appendChild(cta);
      });
    }
  }

  // Compose the table rows
  const headerRow = ['Hero (hero25)'];
  const assetRow = [backgroundAsset || ''];
  const contentRow = [contentCell.childNodes.length ? contentCell : ''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    assetRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
