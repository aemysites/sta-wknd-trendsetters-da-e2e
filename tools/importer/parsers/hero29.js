/* global WebImporter */
export default function parse(element, { document }) {
  // HERO (hero29) block parsing

  // 1. Header row with block name
  const headerRow = ['Hero (hero29)'];

  // 2. Background image extraction (row 2)
  // Find the image element in the hero background
  let backgroundImg = null;
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    // Use the first image found as the hero background
    backgroundImg = imgCandidates[0];
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // 3. Text content extraction (row 3)
  // Find the main heading (h1) and any subheading or CTA
  let textContent = [];
  // Heading
  const heading = element.querySelector('h1');
  if (heading) {
    textContent.push(heading);
  }
  // Subheading (not present in this example, but support for future variants)
  const subheading = element.querySelector('h2, h3');
  if (subheading) {
    textContent.push(subheading);
  }
  // CTA: look for a button or anchor in the hero text area
  const cta = element.querySelector('.button-group a, .button-group button');
  if (cta) {
    textContent.push(cta);
  }
  // Defensive: If no heading, fallback to any direct text node
  if (textContent.length === 0) {
    // Find any text nodes directly under the text container
    const textContainer = element.querySelector('.container');
    if (textContainer) {
      const textNodes = Array.from(textContainer.childNodes).filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      textNodes.forEach(node => {
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textContent.push(p);
      });
    }
  }
  // If nothing found, leave cell empty
  const textRow = [textContent.length > 0 ? textContent : ''];

  // Compose the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
