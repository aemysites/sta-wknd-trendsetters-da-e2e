/* global WebImporter */
export default function parse(element, { document }) {
  // Get all content blocks inside the main grid
  const grid = element.querySelector('.grid-layout');
  const children = grid ? Array.from(grid.children) : [];

  // Find headline (large heading)
  let headline = null;
  for (const child of children) {
    if (child.classList.contains('h1-heading')) {
      // Use original HTML node for exact text/capitalization
      const h = document.createElement('h1');
      h.textContent = child.textContent;
      headline = h;
      break;
    }
  }

  // Find the embed container
  let embedContainer = null;
  for (const child of children) {
    if (child.querySelector('.w-embed-youtubevideo')) {
      embedContainer = child.querySelector('.w-embed-youtubevideo');
      break;
    }
  }

  // Extract image (if present) and convert iframe to link
  let imageEl = null;
  let videoLink = null;
  if (embedContainer) {
    imageEl = embedContainer.querySelector('img')?.cloneNode(true);
    const iframe = embedContainer.querySelector('iframe');
    if (iframe && iframe.src) {
      videoLink = document.createElement('a');
      videoLink.href = iframe.src;
      videoLink.textContent = 'Watch Video';
      videoLink.target = '_blank';
    }
  }

  // Subheading paragraph
  let subheading = null;
  for (const child of children) {
    const p = child.querySelector('p.subheading');
    if (p) {
      subheading = p.cloneNode(true);
      break;
    }
  }

  // CTA buttons
  let ctaLinks = [];
  for (const child of children) {
    if (child.classList.contains('button-group')) {
      const buttons = child.querySelectorAll('a');
      buttons.forEach(btn => {
        ctaLinks.push(btn.cloneNode(true));
      });
      break;
    }
  }

  // --- Assemble table rows ---
  const headerRow = ['Hero (hero25)'];

  // Row 2: Background image or video link (if present)
  const embedRowContent = [];
  if (imageEl) embedRowContent.push(imageEl);
  if (videoLink) embedRowContent.push(videoLink);
  const embedRow = [embedRowContent.length ? embedRowContent : ''];

  // Row 3: Headline, subheading, CTA
  const contentRow = [];
  if (headline) contentRow.push(headline);
  if (subheading) contentRow.push(subheading);
  if (ctaLinks.length) contentRow.push(...ctaLinks);
  const thirdRow = [contentRow.length ? contentRow : ''];

  // Build table
  const cells = [
    headerRow,
    embedRow,
    thirdRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
