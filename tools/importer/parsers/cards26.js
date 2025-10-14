/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, first is image, second is text (heading, description)
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Find all direct card containers (children of the grid)
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // Find the image (mandatory)
    const img = cardDiv.querySelector('img');
    if (!img) return;

    // Find the text content (heading + description)
    let textContent = '';
    const textWrapper = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textWrapper) {
      // Only include heading and paragraph elements, not the wrapper div
      const frag = document.createDocumentFragment();
      const heading = textWrapper.querySelector('h1, h2, h3, h4, h5, h6');
      const para = textWrapper.querySelector('p');
      if (heading) frag.appendChild(heading.cloneNode(true));
      if (para) frag.appendChild(para.cloneNode(true));
      if (frag.childNodes.length) textContent = frag;
    }
    rows.push([
      img,
      textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
