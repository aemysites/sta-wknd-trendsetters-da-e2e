/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // --- Extract Embedded Video ---
  let embedDiv = grid.querySelector('.w-embed-youtubevideo');
  let img = embedDiv ? embedDiv.querySelector('img') : null;
  let iframe = embedDiv ? embedDiv.querySelector('iframe') : null;

  // --- Extract Headings ---
  // Get both the visible and hidden headings
  const headingDiv = grid.querySelector('.h1-heading');
  const hiddenHeading = grid.querySelector('.utility-screen-reader-visible-only');

  // --- Extract Subheading/Paragraph ---
  const subheadingDiv = grid.querySelector('.utility-padding-top-2rem p');

  // --- Extract CTA Buttons ---
  const buttonGroup = grid.querySelector('.button-group');
  let ctas = [];
  if (buttonGroup) {
    ctas = Array.from(buttonGroup.querySelectorAll('a'));
  }

  // --- Compose Table Rows ---
  const headerRow = ['Hero (hero25)'];

  // Row 2: Background image or embed
  let row2Content = '';
  if (embedDiv) {
    // Compose a fragment for the embed
    const frag = document.createDocumentFragment();
    if (img) frag.appendChild(img.cloneNode(true));
    if (iframe) {
      const link = document.createElement('a');
      link.href = iframe.src;
      link.textContent = 'Watch video'; // Use generic label
      frag.appendChild(link);
    }
    row2Content = frag;
  }

  // Row 3: Headings, subheading, CTA
  const frag3 = document.createDocumentFragment();
  // Use semantic heading for visible heading
  if (headingDiv) {
    const h1 = document.createElement('h1');
    h1.textContent = headingDiv.textContent;
    frag3.appendChild(h1);
  }
  // Include hidden heading as visually hidden
  if (hiddenHeading) {
    const srOnly = document.createElement('span');
    srOnly.textContent = hiddenHeading.textContent;
    srOnly.style.position = 'absolute';
    srOnly.style.width = '1px';
    srOnly.style.height = '1px';
    srOnly.style.overflow = 'hidden';
    srOnly.style.clip = 'rect(1px, 1px, 1px, 1px)';
    frag3.appendChild(srOnly);
  }
  if (subheadingDiv) frag3.appendChild(subheadingDiv.cloneNode(true));
  if (ctas.length) {
    const ctaDiv = document.createElement('div');
    ctas.forEach(a => ctaDiv.appendChild(a.cloneNode(true)));
    frag3.appendChild(ctaDiv);
  }

  // Build table
  const cells = [
    headerRow,
    [row2Content],
    [frag3]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
