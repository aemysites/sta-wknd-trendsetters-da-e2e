/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero40)'];

  // 2. Find the background image (img element)
  // It's inside the first grid-layout > div > img
  const gridDivs = element.querySelectorAll(':scope > div > div');
  let bgImg = null;
  if (gridDivs.length > 0) {
    bgImg = gridDivs[0].querySelector('img');
  }

  // 3. Find the text content (headline, subheading, CTA)
  // The second gridDiv contains the text content
  let textContent = null;
  if (gridDivs.length > 1) {
    const textContainer = gridDivs[1];
    // The actual content is in a nested grid
    const innerGrid = textContainer.querySelector('.w-layout-grid');
    if (innerGrid) {
      // We'll collect the headline, subheading, and CTA
      const contentElements = [];
      // Headline (h1)
      const headline = innerGrid.querySelector('h1');
      if (headline) contentElements.push(headline);
      // Subheading (p)
      const subheading = innerGrid.querySelector('p');
      if (subheading) contentElements.push(subheading);
      // CTA (a.button)
      const cta = innerGrid.querySelector('a');
      if (cta) contentElements.push(cta);
      // Wrap all content in a div for structure
      if (contentElements.length) {
        const wrapper = document.createElement('div');
        contentElements.forEach(el => wrapper.appendChild(el));
        textContent = wrapper;
      }
    }
  }

  // 4. Build the table rows
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [textContent ? textContent : ''],
  ];

  // 5. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
