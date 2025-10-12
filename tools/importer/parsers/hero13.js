/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero13)'];

  // --- 1. Background image (row 2) ---
  let backgroundImg = null;
  const topDivs = element.querySelectorAll(':scope > div');
  if (topDivs.length > 0) {
    backgroundImg = topDivs[0].querySelector('img');
  }

  // --- 2. Card overlay content (row 3) ---
  let cardContentDiv = null;
  if (topDivs.length > 1) {
    cardContentDiv = topDivs[1];
  }

  // Compose all card overlay content as a single cell
  const contentFragment = document.createElement('div');
  contentFragment.style.display = 'contents';

  if (cardContentDiv) {
    // Card image (concert crowd)
    const cardImg = cardContentDiv.querySelector('.card-body .grid-layout img');
    if (cardImg) {
      contentFragment.appendChild(cardImg.cloneNode(true));
    }

    // Heading
    const heading = cardContentDiv.querySelector('.card-body .grid-layout h2');
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent;
      contentFragment.appendChild(h2);
    }

    // Feature rows and dividers
    const featureParent = cardContentDiv.querySelector('.flex-vertical.flex-gap-xs');
    if (featureParent) {
      let lastWasFeature = false;
      Array.from(featureParent.children).forEach(child => {
        if (child.classList.contains('flex-horizontal') && child.classList.contains('flex-gap-xxs')) {
          // Feature row: icon + text
          const iconImg = child.querySelector('.icon-small img');
          const text = child.querySelector('p');
          const featureDiv = document.createElement('div');
          if (iconImg) featureDiv.appendChild(iconImg.cloneNode(true));
          if (text) {
            const p = document.createElement('p');
            p.textContent = text.textContent;
            featureDiv.appendChild(p);
          }
          contentFragment.appendChild(featureDiv);
          lastWasFeature = true;
        } else if (child.classList.contains('divider') && lastWasFeature) {
          // Divider after a feature row
          contentFragment.appendChild(child.cloneNode(true));
          lastWasFeature = false;
        }
      });
    }

    // CTA (button)
    const cta = cardContentDiv.querySelector('.button-group a');
    if (cta) {
      const a = document.createElement('a');
      a.href = cta.getAttribute('href');
      a.textContent = cta.textContent;
      contentFragment.appendChild(a);
    }
  }

  // --- Build the table ---
  const cells = [
    headerRow,
    [backgroundImg ? backgroundImg.cloneNode(true) : ''],
    [contentFragment]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
