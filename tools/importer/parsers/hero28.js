/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if element exists
  if (!element) return;

  // Table header row
  const headerRow = ['Hero (hero28)'];

  // ---
  // Row 2: Background Image (optional)
  // Find the main image inside the hero block
  let imageEl = null;
  // Look for the first <img> inside any child divs
  const imgCandidates = element.querySelectorAll('img');
  if (imgCandidates.length > 0) {
    imageEl = imgCandidates[0];
  }
  // Defensive: If no image found, leave cell empty
  const imageRow = [imageEl ? imageEl : ''];

  // ---
  // Row 3: Headline, subheading, CTA (optional)
  // Find the main heading (h1)
  let textContentEls = [];
  // The heading is inside a nested div with class 'utility-margin-bottom-6rem'
  const textContainer = element.querySelector('.utility-margin-bottom-6rem');
  if (textContainer) {
    // Add all heading elements inside this container
    const headings = textContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headings.forEach(h => textContentEls.push(h));
    // Add all paragraphs (if any)
    const paragraphs = textContainer.querySelectorAll('p');
    paragraphs.forEach(p => textContentEls.push(p));
    // Add any button/link CTA (if any)
    const ctas = textContainer.querySelectorAll('a, button');
    ctas.forEach(cta => textContentEls.push(cta));
    // Defensive: If no headings/paragraphs/buttons, fallback to all children
    if (textContentEls.length === 0) {
      textContentEls = Array.from(textContainer.childNodes).filter(n => n.nodeType === 1);
    }
  }
  // Defensive: If no text container found, leave cell empty
  const textRow = [textContentEls.length ? textContentEls : ''];

  // ---
  // Compose table rows
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
