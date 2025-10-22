/* global WebImporter */
export default function parse(element, { document }) {
  // --- Row 2: Background Image ---
  // Find the background image (should be the full-bleed image, not the card image)
  const bgImg = element.querySelector('img.cover-image.utility-position-absolute');

  // --- Row 3: Content (card overlay: group image, headline, features, CTA) ---
  // Find the card overlay
  const card = element.querySelector('.card');
  let contentCell = '';
  if (card) {
    // Find the group image (inside the card)
    const groupImg = card.querySelector('img.cover-image.utility-aspect-1x1');
    // Find the headline (h2)
    const headline = card.querySelector('h2');
    // Find the feature list (all feature rows)
    const features = Array.from(card.querySelectorAll('.flex-horizontal.flex-gap-xxs'));
    // Find the CTA button
    const cta = card.querySelector('.button-group a, .button-group button');

    // Compose a two-column layout for the cell
    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'row';
    wrapper.style.alignItems = 'flex-start';
    // Left column: group image
    if (groupImg) {
      const leftCol = document.createElement('div');
      leftCol.appendChild(groupImg.cloneNode(true));
      leftCol.style.marginRight = '2em';
      wrapper.appendChild(leftCol);
    }
    // Right column: headline, features, CTA
    const rightCol = document.createElement('div');
    if (headline) rightCol.appendChild(headline.cloneNode(true));
    features.forEach(feature => {
      // Only include the icon and paragraph (not the divider)
      const icon = feature.querySelector('.icon-small');
      const text = feature.querySelector('p');
      const row = document.createElement('div');
      row.style.display = 'flex';
      row.style.alignItems = 'center';
      if (icon) row.appendChild(icon.cloneNode(true));
      if (text) row.appendChild(text.cloneNode(true));
      rightCol.appendChild(row);
    });
    if (cta) rightCol.appendChild(cta.cloneNode(true));
    wrapper.appendChild(rightCol);
    contentCell = wrapper;
  }

  // Compose table rows
  const headerRow = ['Hero (hero13)'];
  const bgImgRow = [bgImg ? bgImg.cloneNode(true) : ''];
  const contentRow = [contentCell ? contentCell : ''];

  // Create the block table
  const cells = [headerRow, bgImgRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
