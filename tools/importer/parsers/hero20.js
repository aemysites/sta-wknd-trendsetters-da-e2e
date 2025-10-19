/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all images in the hero collage
  function getHeroImages(heroGrid) {
    // Defensive: Only select direct children images
    return Array.from(heroGrid.querySelectorAll('img'));
  }

  // Helper: Get hero text content (heading, subheading, CTAs)
  function getHeroTextContent(heroContent) {
    // Heading (h1)
    const heading = heroContent.querySelector('h1');
    // Subheading (p)
    const subheading = heroContent.querySelector('p');
    // CTA buttons (all <a> in button group)
    const buttonGroup = heroContent.querySelector('.button-group');
    let ctas = [];
    if (buttonGroup) {
      ctas = Array.from(buttonGroup.querySelectorAll('a'));
    }
    // Compose cell content
    const cellContent = [];
    if (heading) cellContent.push(heading);
    if (subheading) cellContent.push(subheading);
    if (ctas.length) cellContent.push(...ctas);
    return cellContent;
  }

  // Find the hero image grid (collage)
  const heroGrid = element.querySelector('.grid-layout.desktop-3-column');
  // Find the hero text content
  const heroContent = element.querySelector('.ix-hero-scale-3x-to-1x-content');

  // Compose table rows
  const headerRow = ['Hero (hero20)'];

  // Row 2: Background collage images
  let imageRow = [];
  if (heroGrid) {
    const images = getHeroImages(heroGrid);
    if (images.length) {
      // Put all images in one cell (as array)
      imageRow = [images];
    } else {
      imageRow = [''];
    }
  } else {
    imageRow = [''];
  }

  // Row 3: Text content (heading, subheading, CTAs)
  let textRow = [];
  if (heroContent) {
    const cellContent = getHeroTextContent(heroContent);
    if (cellContent.length) {
      textRow = [cellContent];
    } else {
      textRow = [''];
    }
  } else {
    textRow = [''];
  }

  // Build the block table
  const cells = [headerRow, imageRow, textRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
