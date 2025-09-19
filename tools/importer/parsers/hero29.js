/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of a node by tag name
  function getImmediateChildByTag(parent, tag) {
    return Array.from(parent.children).find(child => child.tagName === tag.toUpperCase());
  }

  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row (optional)
  // Find the image inside the parallax div
  let bgImg = null;
  const gridDiv = element.querySelector('.w-layout-grid');
  if (gridDiv) {
    // Find the first div with class 'ix-parallax-scale-out-hero'
    const parallaxDiv = gridDiv.querySelector('.ix-parallax-scale-out-hero');
    if (parallaxDiv) {
      bgImg = parallaxDiv.querySelector('img');
    }
  }
  const imageRow = [bgImg ? bgImg : ''];

  // 3. Content row: heading, subheading, CTA
  // Find the container with the heading
  let contentCell = '';
  if (gridDiv) {
    // The second child div is the content container
    const contentDiv = gridDiv.querySelector('.container');
    if (contentDiv) {
      // The heading is inside a div.utility-margin-bottom-6rem
      const marginDiv = contentDiv.querySelector('.utility-margin-bottom-6rem');
      if (marginDiv) {
        // Get all children (h1, button group, etc)
        const contentElements = [];
        // Heading
        const h1 = marginDiv.querySelector('h1');
        if (h1) contentElements.push(h1);
        // Subheading: not present in this example, but could be h2/h3/p
        // CTA: look for .button-group inside marginDiv
        const buttonGroup = marginDiv.querySelector('.button-group');
        if (buttonGroup && buttonGroup.children.length > 0) {
          contentElements.push(buttonGroup);
        }
        contentCell = contentElements.length ? contentElements : '';
      }
    }
  }
  const contentRow = [contentCell];

  // 4. Compose table
  const tableCells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  // 5. Replace original element
  element.replaceWith(table);
}
