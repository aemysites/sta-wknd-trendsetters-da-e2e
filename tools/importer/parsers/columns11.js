/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns block (columns11)'];

  // --- Top Section: Text & Meta ---
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftCellContent = [];
  let rightCellContent = [];
  if (mainGrid) {
    const mainGridChildren = mainGrid.querySelectorAll(':scope > div');
    // Left: Eyebrow + Headline
    const leftTextBlock = mainGridChildren[0];
    if (leftTextBlock) {
      const eyebrow = leftTextBlock.querySelector('.eyebrow');
      const headline = leftTextBlock.querySelector('h1');
      if (eyebrow) leftCellContent.push(eyebrow);
      if (headline) leftCellContent.push(headline);
    }
    // Right: Paragraph + meta + button
    const rightTextBlock = mainGridChildren[1];
    if (rightTextBlock) {
      const paragraph = rightTextBlock.querySelector('.rich-text');
      if (paragraph) rightCellContent.push(paragraph);
      // Author info row and button grouped together
      const metaRow = rightTextBlock.querySelector('.w-layout-grid .flex-horizontal.y-center');
      const button = rightTextBlock.querySelector('a.button');
      if (metaRow || button) {
        const metaGroup = document.createElement('div');
        metaGroup.style.display = 'flex';
        metaGroup.style.alignItems = 'center';
        if (metaRow) {
          // Avatar
          const avatar = metaRow.querySelector('.avatar img');
          if (avatar) metaGroup.appendChild(avatar.cloneNode(true));
          // Author name
          const authorName = metaRow.querySelector('.paragraph-sm:not(.utility-text-secondary)');
          if (authorName) metaGroup.appendChild(authorName.cloneNode(true));
          // Meta details (date, dot, read time)
          const metaDetails = metaRow.querySelectorAll('.utility-text-secondary');
          metaDetails.forEach(meta => metaGroup.appendChild(meta.cloneNode(true)));
        }
        if (button) metaGroup.appendChild(button.cloneNode(true));
        rightCellContent.push(metaGroup);
      }
    }
  }

  // --- Bottom Section: Images ---
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let imageRow = [];
  if (imageGrid) {
    const imageCells = Array.from(imageGrid.querySelectorAll('.utility-aspect-1x1'));
    imageRow = imageCells.map(cell => {
      const img = cell.querySelector('img');
      return img ? [img] : [];
    });
  }

  const tableCells = [
    headerRow,
    [leftCellContent, rightCellContent],
    imageRow
  ];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
