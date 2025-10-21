/* global WebImporter */
export default function parse(element, { document }) {
  // Find main grids
  const topLevelDivs = element.querySelectorAll(':scope > div');
  let heroGrid, imageGrid;
  for (const div of topLevelDivs) {
    if (div.classList.contains('w-layout-grid') && div.classList.contains('grid-layout') && div.classList.contains('tablet-1-column')) {
      heroGrid = div;
    }
    if (div.classList.contains('w-layout-grid') && div.classList.contains('grid-layout') && div.classList.contains('mobile-portrait-1-column')) {
      imageGrid = div;
    }
  }

  // --- Hero Section (Left and Right Columns) ---
  let heroLeftContent = '', heroRightContent = '';
  if (heroGrid) {
    const heroChildren = heroGrid.querySelectorAll(':scope > div');
    // Left: gather all content (including text nodes and elements)
    if (heroChildren[0]) {
      // Use all child elements and text nodes
      heroLeftContent = Array.from(heroChildren[0].childNodes).map(node => node.cloneNode(true));
      // If nothing found, fallback to textContent
      if (!heroLeftContent.length || !heroLeftContent.some(n => (n.textContent || '').trim())) {
        heroLeftContent = [document.createTextNode(heroChildren[0].textContent)];
      }
    }
    // Right: gather all content (including text nodes and elements)
    if (heroChildren[1]) {
      heroRightContent = Array.from(heroChildren[1].childNodes).map(node => node.cloneNode(true));
      if (!heroRightContent.length || !heroRightContent.some(n => (n.textContent || '').trim())) {
        heroRightContent = [document.createTextNode(heroChildren[1].textContent)];
      }
    }
  }

  // --- Image Grid (Bottom Row, Two Images) ---
  let image1Cell = '', image2Cell = '';
  if (imageGrid) {
    const imageDivs = imageGrid.querySelectorAll(':scope > div');
    image1Cell = [];
    image2Cell = [];
    if (imageDivs[0]) {
      const img1 = imageDivs[0].querySelector('img');
      if (img1) image1Cell.push(img1.cloneNode(true));
    }
    if (imageDivs[1]) {
      const img2 = imageDivs[1].querySelector('img');
      if (img2) image2Cell.push(img2.cloneNode(true));
    }
  }

  // --- Compose Table Rows ---
  const headerRow = ['Columns (columns11)'];
  const secondRow = [heroLeftContent, heroRightContent];
  const thirdRow = [image1Cell, image2Cell];
  const cells = [headerRow, secondRow, thirdRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
