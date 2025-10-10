/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Find all card containers (each card is a direct child div)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // Find the icon (img inside .icon)
    const iconWrapper = cardDiv.querySelector('.icon');
    let iconImg = null;
    if (iconWrapper) {
      iconImg = iconWrapper.querySelector('img');
    }

    // Find the text content (all <p> inside cardDiv)
    // Instead of just the first <p>, collect all text content
    let textContent = '';
    const paragraphs = cardDiv.querySelectorAll('p');
    if (paragraphs.length > 0) {
      textContent = Array.from(paragraphs).map(p => p.textContent.trim()).join('\n');
    } else {
      // Fallback: get all text content from cardDiv except icon
      const clone = cardDiv.cloneNode(true);
      const icon = clone.querySelector('.icon');
      if (icon) icon.remove();
      textContent = clone.textContent.trim();
    }

    // Defensive: Only add row if both icon and text exist
    if (iconImg && textContent) {
      rows.push([
        iconImg,
        textContent
      ]);
    }
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
