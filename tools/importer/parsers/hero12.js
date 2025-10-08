/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero12)'];

  // 2. Find background image (large image, likely first img in the section)
  // The background image is the one with class 'cover-image utility-position-absolute'
  const bgImg = element.querySelector('img.cover-image.utility-position-absolute');

  // 3. Find the card image (the smaller, square image)
  // This is the img with class 'image cover-image utility-aspect-1x1'
  const cardImg = element.querySelector('img.image.cover-image.utility-aspect-1x1');

  // 4. Find the content area (title, features, CTA)
  // The content is inside the .card-body, but we want only the relevant content
  const cardBody = element.querySelector('.card-body');

  // Defensive: If cardBody is missing, fallback to the main container
  const contentContainer = cardBody || element;

  // 5. Extract the main heading (h2)
  const heading = contentContainer.querySelector('h2');

  // 6. Extract the feature list (icon + text pairs)
  // These are in .flex-horizontal.flex-gap-xxs > .icon-small + p
  const features = Array.from(contentContainer.querySelectorAll('.flex-horizontal.flex-gap-xxs'))
    .map(featureRow => {
      // Get icon (svg img)
      const icon = featureRow.querySelector('.icon-small img');
      // Get text (p)
      const text = featureRow.querySelector('p');
      // Compose a fragment for each feature
      const frag = document.createElement('div');
      frag.style.display = 'flex';
      frag.style.alignItems = 'center';
      if (icon) frag.appendChild(icon.cloneNode(true));
      if (text) frag.appendChild(text.cloneNode(true));
      return frag;
    });

  // 7. Extract the CTA button (a.button)
  const cta = contentContainer.querySelector('a.button');

  // 8. Compose the content for the third row
  // We'll use a fragment to preserve structure
  const contentFrag = document.createElement('div');
  if (heading) contentFrag.appendChild(heading.cloneNode(true));
  features.forEach(f => contentFrag.appendChild(f));
  if (cta) contentFrag.appendChild(cta.cloneNode(true));

  // 9. Row 2: background image (if present)
  const row2 = [bgImg ? bgImg : ''];

  // 10. Row 3: content (card image + text content)
  // Compose a fragment: card image on top, then content
  const row3Frag = document.createElement('div');
  if (cardImg) row3Frag.appendChild(cardImg.cloneNode(true));
  row3Frag.appendChild(contentFrag);
  const row3 = [row3Frag];

  // 11. Assemble the table
  const cells = [
    headerRow,
    row2,
    row3
  ];

  // 12. Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 13. Replace the original element
  element.replaceWith(table);
}
