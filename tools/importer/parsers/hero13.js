/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero13)'];

  // 2. Extract background image (main hero image)
  const bgImageDiv = element.querySelector(':scope > div');
  let bgImg = null;
  if (bgImageDiv) {
    bgImg = bgImageDiv.querySelector('img.cover-image');
  }

  // 3. Extract card overlay content (all visible content)
  const cardBody = element.querySelector('.card-body');
  const overlayContent = [];

  // Secondary image (inside card overlay)
  const secondaryImg = cardBody && cardBody.querySelector('img.cover-image.image');
  if (secondaryImg) overlayContent.push(secondaryImg);

  // Heading
  const heading = cardBody && cardBody.querySelector('h2');
  if (heading) overlayContent.push(heading);

  // Supporting text items (with icons)
  if (cardBody) {
    const vertical = cardBody.querySelector('.flex-vertical');
    if (vertical) {
      const rows = vertical.querySelectorAll('.flex-horizontal');
      rows.forEach(row => {
        // Each row: icon + paragraph
        const icon = row.querySelector('.icon-small');
        const text = row.querySelector('p');
        if (icon && text) {
          const featureDiv = document.createElement('div');
          featureDiv.appendChild(icon.cloneNode(true));
          featureDiv.appendChild(text.cloneNode(true));
          overlayContent.push(featureDiv);
        }
      });
    }
  }

  // Call-to-action button
  const cta = cardBody && cardBody.querySelector('.button-group a.button');
  if (cta) overlayContent.push(cta);

  // 4. Table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [overlayContent.length ? overlayContent : '']
  ];

  // 5. Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
