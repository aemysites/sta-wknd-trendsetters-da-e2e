/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero13)'];

  // 2. Background image (row 2)
  const bgImg = element.querySelector('img.cover-image.utility-position-absolute');
  const bgImgCell = bgImg ? bgImg.cloneNode(true) : '';

  // 3. Content (row 3)
  const cardBody = element.querySelector('.card-body');
  let contentCell = '';
  if (cardBody) {
    // Find the headline (h2)
    const headline = cardBody.querySelector('h2');

    // Find the secondary image (concert crowd)
    const secondaryImg = cardBody.querySelector('img.image.cover-image.utility-aspect-1x1');

    // Find the feature list (icon + text pairs)
    const featureRows = cardBody.querySelectorAll('.flex-horizontal.flex-gap-xxs');
    const features = [];
    featureRows.forEach(row => {
      const icon = row.querySelector('.icon-small img');
      const text = row.querySelector('p');
      if (icon && text) {
        const wrapper = document.createElement('div');
        wrapper.appendChild(icon.cloneNode(true));
        wrapper.appendChild(text.cloneNode(true));
        features.push(wrapper);
      }
    });

    // Find the CTA button (first .button-group > a)
    const ctaBtn = cardBody.querySelector('.button-group a');

    // Compose the content cell as a vertical stack
    const contentStack = [];
    if (headline) contentStack.push(headline.cloneNode(true));
    features.forEach(f => contentStack.push(f));
    if (ctaBtn) contentStack.push(ctaBtn.cloneNode(true));
    if (secondaryImg) contentStack.push(secondaryImg.cloneNode(true));

    // Defensive: If no content found, fallback to all text in cardBody
    if (contentStack.length === 0) {
      contentStack.push(document.createTextNode(cardBody.textContent.trim()));
    }

    contentCell = contentStack;
  }

  // 4. Build the table
  const rows = [
    headerRow,
    [bgImgCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
