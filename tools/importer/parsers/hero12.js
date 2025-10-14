/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero12)'];

  // 2. Background image (main hero image)
  let bgImg = '';
  const bgImgEl = element.querySelector('.utility-position-relative img.cover-image');
  if (bgImgEl) bgImg = bgImgEl;

  // 3. Card overlay content: secondary image, heading, bullets, CTA
  let cardContent = document.createElement('div');

  // Secondary image (concert crowd)
  const secondaryImg = element.querySelector('.card-body img.cover-image');
  if (secondaryImg) cardContent.appendChild(secondaryImg.cloneNode(true));

  // Heading
  const heading = element.querySelector('.card-body h2');
  if (heading) {
    const h1 = document.createElement('h1');
    h1.innerHTML = heading.innerHTML;
    cardContent.appendChild(h1);
  }

  // Bullets (icon + text)
  const flexVertical = element.querySelector('.flex-vertical');
  if (flexVertical) {
    flexVertical.querySelectorAll('.flex-horizontal').forEach(row => {
      const icon = row.querySelector('.icon-small img');
      const text = row.querySelector('p');
      if (text) {
        const bullet = document.createElement('div');
        bullet.style.display = 'flex';
        if (icon) bullet.appendChild(icon.cloneNode(true));
        bullet.appendChild(document.createTextNode(' ' + text.textContent.trim()));
        cardContent.appendChild(bullet);
      }
    });
  }

  // CTA button
  const cta = element.querySelector('.button-group a.button');
  if (cta) cardContent.appendChild(cta.cloneNode(true));

  // Table rows
  const row2 = [bgImg || ''];
  const row3 = [cardContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row2,
    row3
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
