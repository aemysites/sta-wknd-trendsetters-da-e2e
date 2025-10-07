/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero13)'];

  // --- Row 2: Background image ---
  const bgImg = element.querySelector('img.cover-image.utility-position-absolute');
  const imageRow = [bgImg ? bgImg.cloneNode(true) : ''];

  // --- Row 3: Content cell ---
  const card = element.querySelector('.card');
  let contentCell;
  if (card) {
    const grid = card.querySelector('.w-layout-grid');
    if (grid) {
      const gridChildren = Array.from(grid.children);
      // Right: content (headline, features, CTA)
      const rightCol = gridChildren.find(el => el.querySelector('.h2-heading'));
      // Left: concert crowd image
      const leftImg = grid.querySelector('img.cover-image.utility-aspect-1x1');
      // Compose rightCol content
      const rightContent = document.createElement('div');
      if (rightCol) {
        // Headline
        const headline = rightCol.querySelector('.h2-heading');
        if (headline) rightContent.appendChild(headline.cloneNode(true));
        // Features
        const featuresFlex = rightCol.querySelector('.flex-vertical');
        if (featuresFlex) {
          const featureRows = featuresFlex.querySelectorAll('.flex-horizontal');
          featureRows.forEach((row, idx) => {
            const icon = row.querySelector('.icon-small img');
            const text = row.querySelector('p');
            if (icon && text) {
              const featureDiv = document.createElement('div');
              featureDiv.style.display = 'flex';
              featureDiv.style.alignItems = 'center';
              featureDiv.appendChild(icon.cloneNode(true));
              featureDiv.appendChild(text.cloneNode(true));
              rightContent.appendChild(featureDiv);
            }
            // Divider after each except last
            const dividers = featuresFlex.querySelectorAll('.divider');
            if (dividers[idx]) {
              rightContent.appendChild(dividers[idx].cloneNode(true));
            }
          });
        }
        // CTA
        const cta = rightCol.querySelector('.button-group a.button');
        if (cta) rightContent.appendChild(cta.cloneNode(true));
      }
      // Compose the cell: right content and left image (concert crowd)
      contentCell = document.createElement('div');
      contentCell.style.display = 'flex';
      contentCell.style.alignItems = 'flex-start';
      contentCell.style.gap = '2rem';
      // Main text content
      contentCell.appendChild(rightContent);
      // Right-aligned image (concert crowd)
      if (leftImg) contentCell.appendChild(leftImg.cloneNode(true));
    } else {
      // fallback: just clone the card
      contentCell = card.cloneNode(true);
    }
  } else {
    // fallback: all text content
    contentCell = document.createElement('div');
    contentCell.textContent = element.textContent.trim();
  }
  const contentRow = [contentCell];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
