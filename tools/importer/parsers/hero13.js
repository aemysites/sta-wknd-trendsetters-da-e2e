/* global WebImporter */
export default function parse(element, { document }) {
  // Find the background image for row 2
  const bgImg = element.querySelector('img.cover-image.utility-position-absolute');

  // Find the content block for row 3 (should NOT include the content image)
  let contentBlock = '';
  const cardBody = element.querySelector('.card-body');
  if (cardBody) {
    const grid = cardBody.querySelector('.grid-layout');
    if (grid) {
      // The grid has: [text+cta, image]
      // We want ONLY the text+cta (the first child)
      const textAndCta = grid.children[0];
      if (textAndCta) {
        // Instead of just cloning, collect all text content and CTA
        const fragment = document.createElement('div');
        // Heading
        const heading = textAndCta.querySelector('h2');
        if (heading) fragment.appendChild(heading.cloneNode(true));
        // List items (icon + text)
        const verticalFlex = textAndCta.querySelector('.flex-vertical');
        if (verticalFlex) {
          Array.from(verticalFlex.querySelectorAll('.flex-horizontal')).forEach(row => {
            // Get text paragraph
            const p = row.querySelector('p');
            if (p) fragment.appendChild(p.cloneNode(true));
          });
        }
        // CTA button
        const buttonGroup = textAndCta.querySelector('.button-group');
        if (buttonGroup) {
          const btn = buttonGroup.querySelector('a');
          if (btn) fragment.appendChild(btn.cloneNode(true));
        }
        contentBlock = fragment;
      }
    }
  }

  const headerRow = ['Hero (hero13)'];
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentBlock ? contentBlock : ''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
