/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // --- HEADER ROW ---
  const headerRow = ['Hero (hero25)'];

  // --- MEDIA ROW ---
  let mediaCell = [];
  // Find the media container (holds embed)
  const mediaDiv = gridChildren.find(child => child.classList.contains('utility-position-relative'));
  if (mediaDiv) {
    // Look for an <img> (placeholder) and <iframe> (embed)
    const img = mediaDiv.querySelector('img');
    const iframe = mediaDiv.querySelector('iframe');
    if (img) {
      mediaCell.push(img.cloneNode(true));
    }
    if (iframe) {
      // Use generic link text as video overlay is not in HTML
      const a = document.createElement('a');
      a.href = iframe.src;
      a.textContent = 'Watch video';
      mediaCell.push(a);
    }
  }
  const mediaRow = [mediaCell.length === 1 ? mediaCell[0] : mediaCell];

  // --- CONTENT ROW ---
  // Title: div with class h1-heading
  const titleDiv = gridChildren.find(child => child.classList.contains('h1-heading'));
  // Subheading: div with class utility-padding-top-2rem (contains <p>)
  const subheadingDiv = gridChildren.find(child => child.classList.contains('utility-padding-top-2rem'));
  // CTA: div with class button-group
  const ctaDiv = gridChildren.find(child => child.classList.contains('button-group'));

  // Compose content cell: extract text content for title and subheading, and clone CTAs
  const contentCell = [];
  if (titleDiv) {
    const h1 = document.createElement('h1');
    h1.textContent = titleDiv.textContent.trim();
    contentCell.push(h1);
  }
  if (subheadingDiv) {
    const p = subheadingDiv.querySelector('p');
    if (p) {
      contentCell.push(p.cloneNode(true));
    }
  }
  if (ctaDiv) {
    const ctas = Array.from(ctaDiv.querySelectorAll('a')).map(a => a.cloneNode(true));
    contentCell.push(...ctas);
  }
  const contentRow = [contentCell];

  // --- TABLE ASSEMBLY ---
  const rows = [headerRow, mediaRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
