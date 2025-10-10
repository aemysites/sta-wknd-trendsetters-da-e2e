/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image (should be the main hero image, not the inset)
  // The main background image is the first .cover-image inside the top-level grid
  const bgImg = element.querySelector('.cover-image.utility-position-absolute');

  // Find the card section (contains inset image and content)
  const card = element.querySelector('.card.card-on-secondary');
  const cardBody = card ? card.querySelector('.card-body') : null;
  const grid = cardBody ? cardBody.querySelector('.grid-layout') : null;

  // Inset image (concert crowd)
  let insetImg = null;
  if (grid) {
    insetImg = grid.querySelector('img.image.cover-image.utility-aspect-1x1');
  }

  // Content: headline, features, CTA
  let contentDiv = null;
  if (grid) {
    contentDiv = Array.from(grid.children).find(child => child.querySelector('h2.h2-heading'));
  }

  // Headline
  const headline = contentDiv ? contentDiv.querySelector('h2.h2-heading') : null;

  // Feature rows (icon + text)
  const features = [];
  if (contentDiv) {
    const featureRows = contentDiv.querySelectorAll('.flex-horizontal.flex-gap-xxs');
    featureRows.forEach(row => {
      const icon = row.querySelector('.icon-small');
      const text = row.querySelector('p');
      if (icon && text) {
        features.push([icon, text]);
      }
    });
  }

  // CTA button
  let cta = null;
  if (contentDiv) {
    cta = contentDiv.querySelector('.button-group .button');
  }

  // Compose content cell (row 3)
  const contentCell = document.createElement('div');

  // Inset image (left)
  if (insetImg) {
    const imgWrapper = document.createElement('div');
    imgWrapper.appendChild(insetImg);
    contentCell.appendChild(imgWrapper);
  }

  // Textual content (right)
  const textWrapper = document.createElement('div');
  if (headline) textWrapper.appendChild(headline);
  features.forEach(([icon, text]) => {
    const row = document.createElement('div');
    row.appendChild(icon);
    row.appendChild(text);
    textWrapper.appendChild(row);
  });
  if (cta) textWrapper.appendChild(cta);
  contentCell.appendChild(textWrapper);

  // Table Construction
  const headerRow = ['Hero (hero13)'];
  const bgRow = [bgImg ? bgImg : ''];
  const contentRow = [contentCell];
  const cells = [headerRow, bgRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
