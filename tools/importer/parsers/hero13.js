/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get direct children divs of the section
  const sectionDivs = element.querySelectorAll(':scope > div');

  // 2. Extract the background image (first child div > img)
  let backgroundImg = null;
  if (sectionDivs.length > 0) {
    backgroundImg = sectionDivs[0].querySelector('img');
  }

  // 3. Extract the right content (headline, features, button) - ensure all text is included
  let contentCell = null;
  if (sectionDivs.length > 1) {
    const cardBody = sectionDivs[1].querySelector('.card-body');
    if (cardBody) {
      const grid = cardBody.querySelector('.grid-layout');
      if (grid) {
        // Headline (h2)
        const h2 = grid.querySelector('h2');
        // All .flex-horizontal.flex-gap-xxs (feature rows)
        const features = grid.querySelectorAll('.flex-horizontal.flex-gap-xxs');
        // Button (if any)
        const buttonGroup = grid.querySelector('.button-group');
        // Compose content only if any part exists
        if (h2 || features.length > 0 || buttonGroup) {
          contentCell = document.createElement('div');
          if (h2) contentCell.appendChild(h2.cloneNode(true));
          features.forEach(f => {
            contentCell.appendChild(f.cloneNode(true));
          });
          if (buttonGroup) {
            contentCell.appendChild(buttonGroup.cloneNode(true));
          }
        }
      }
    }
  }

  // 4. Compose table rows
  const headerRow = ['Hero (hero13)'];
  const bgRow = [backgroundImg ? backgroundImg : ''];
  // Always add the third row to match block spec, but only if contentCell exists or at least an empty string if not
  const contentRow = [contentCell ? contentCell : ''];
  const cells = [headerRow, bgRow, contentRow];

  // 5. Remove empty last row if both background and content are empty (edge case)
  // (Not needed for this block, always 3 rows per spec)

  // 6. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
