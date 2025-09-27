/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children with a selector
  const getDirectChild = (parent, selector) => {
    return Array.from(parent.children).find((el) => el.matches(selector));
  };

  // 1. Header row
  const headerRow = ['Hero (hero6)'];

  // 2. Background image row
  // Find the image inside the first grid-layout > first div
  let backgroundImg = null;
  const gridLayout = element.querySelector('.grid-layout');
  if (gridLayout) {
    // The first child div contains the background image
    const bgDiv = gridLayout.children[0];
    if (bgDiv) {
      backgroundImg = bgDiv.querySelector('img');
    }
  }
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row: Heading, subheading, CTA(s)
  let contentElements = [];
  if (gridLayout && gridLayout.children.length > 1) {
    // The second child div contains the content
    const contentContainer = gridLayout.children[1];
    // Drill down to the card
    const card = contentContainer.querySelector('.card');
    if (card) {
      // Heading
      const heading = card.querySelector('h1, h2, h3, h4, h5, h6');
      if (heading) contentElements.push(heading);
      // Subheading (paragraph)
      const subheading = card.querySelector('p');
      if (subheading) contentElements.push(subheading);
      // CTA buttons
      const buttonGroup = card.querySelector('.button-group');
      if (buttonGroup) {
        // Use all direct children (likely <a> elements)
        const ctas = Array.from(buttonGroup.children).filter((el) => el.tagName === 'A');
        if (ctas.length) contentElements = contentElements.concat(ctas);
      }
    }
  }
  const contentRow = [contentElements.length ? contentElements : ''];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow,
  ], document);

  // Replace original element
  element.replaceWith(table);
}
