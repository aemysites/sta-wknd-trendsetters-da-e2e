/* global WebImporter */
export default function parse(element, { document }) {
  // Get the top-level container
  const topDiv = element.querySelector(':scope > div');
  if (!topDiv) return;
  const gridDiv = topDiv.querySelector(':scope > div');
  if (!gridDiv) return;
  const children = Array.from(gridDiv.children);

  // --- Extract Image/Video ---
  let imageOrVideoCell = '';
  const videoDiv = children.find(child => child.querySelector('.w-embed-youtubevideo'));
  if (videoDiv) {
    const embedDiv = videoDiv.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      // Use the actual <img> element from the DOM
      const img = embedDiv.querySelector('img');
      if (img) imageOrVideoCell = img;
    }
  }

  // --- Extract Headline ---
  let headline = '';
  const headingDiv = children.find(child => child.classList.contains('h1-heading'));
  if (headingDiv) {
    // Wrap as <h1>
    const h1 = document.createElement('h1');
    h1.textContent = headingDiv.textContent.trim();
    headline = h1;
  }

  // --- Extract Subheading (paragraph) ---
  let subheading = '';
  const subheadingDiv = children.find(child => child.querySelector('p.subheading'));
  if (subheadingDiv) {
    const subheadingP = subheadingDiv.querySelector('p.subheading');
    if (subheadingP) {
      // Use the actual <p> element from the DOM
      subheading = subheadingP;
    }
  }

  // --- Extract CTA Buttons ---
  let ctas = [];
  const buttonGroupDiv = children.find(child => child.classList.contains('button-group'));
  if (buttonGroupDiv) {
    const buttons = Array.from(buttonGroupDiv.querySelectorAll('a.button, a.secondary-button'));
    ctas = buttons;
  }

  // --- Compose content cell ---
  const contentCell = [];
  if (headline) contentCell.push(headline);
  if (subheading) contentCell.push(subheading);
  if (ctas.length) ctas.forEach(btn => contentCell.push(btn));

  // --- Compose table rows ---
  const headerRow = ['Hero (hero25)'];
  const imageRow = [imageOrVideoCell ? imageOrVideoCell : ''];
  const contentRow = [contentCell.length ? contentCell : ''];

  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
