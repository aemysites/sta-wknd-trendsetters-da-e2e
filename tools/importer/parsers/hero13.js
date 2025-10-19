/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero13)'];

  // Find the main grid children
  const gridChildren = element.querySelectorAll(':scope > div > div');

  // --- Background Image (row 2) ---
  let backgroundImgCell = '';
  if (gridChildren.length > 0) {
    const bgImgDiv = gridChildren[0];
    const bgImg = bgImgDiv.querySelector('img');
    if (bgImg) backgroundImgCell = bgImg.cloneNode(true);
  }

  // --- Hero Content (row 3) ---
  let heroTextContent = '';
  let supportingImg = '';
  if (gridChildren.length > 1) {
    const cardContainer = gridChildren[1];
    const cardBody = cardContainer.querySelector('.card-body');
    if (cardBody) {
      const innerGrid = cardBody.querySelector('.grid-layout');
      if (innerGrid) {
        for (const child of innerGrid.children) {
          // Hero text content (contains heading)
          if (child.querySelector('h2')) {
            const heroTextParts = [];
            // Heading
            const heading = child.querySelector('h2');
            if (heading) heroTextParts.push(heading.cloneNode(true));
            // Feature rows (icon + text)
            const verticalFlex = child.querySelector('.flex-vertical');
            if (verticalFlex) {
              const rows = verticalFlex.querySelectorAll('.flex-horizontal');
              rows.forEach((row, idx) => {
                const icon = row.querySelector('.icon-small');
                const text = row.querySelector('p');
                if (icon && text) {
                  heroTextParts.push(icon.cloneNode(true));
                  heroTextParts.push(text.cloneNode(true));
                }
                // Divider after each row except last
                if (idx < rows.length - 1) {
                  const divider = row.parentElement.querySelectorAll('.divider')[idx];
                  if (divider) heroTextParts.push(divider.cloneNode(true));
                }
              });
            }
            // CTA button
            const buttonGroup = child.querySelector('.button-group');
            if (buttonGroup) {
              const button = buttonGroup.querySelector('a');
              if (button) {
                heroTextParts.push(button.cloneNode(true));
              }
            }
            heroTextContent = document.createElement('div');
            heroTextParts.forEach(part => heroTextContent.appendChild(part));
          }
          // Supporting image (concert crowd)
          const imgs = child.querySelectorAll('img');
          for (const img of imgs) {
            if (!img.src.startsWith('data:image/svg+xml')) {
              // Only add the supporting image if it's not the background image
              // and not an icon
              // The supporting image is the one with a src containing '1f18cfa7-1de3-4a32-9756-5dee8d7a36b3'
              if (img.src.includes('1f18cfa7-1de3-4a32-9756-5dee8d7a36b3')) {
                supportingImg = img.cloneNode(true);
              }
            }
          }
        }
      }
    }
  }

  // Compose the cell: hero text content + supporting image (concert crowd)
  const heroContentWrapper = document.createElement('div');
  if (heroTextContent) heroContentWrapper.appendChild(heroTextContent);
  if (supportingImg) heroContentWrapper.appendChild(supportingImg);
  const heroContentCell = heroContentWrapper;

  // Compose table rows
  const tableRows = [
    headerRow,
    [backgroundImgCell],
    [heroContentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(block);
}
