/* global WebImporter */
export default function parse(element, { document }) {
  // Header row per block spec
  const headerRow = ['Embed (embedVideo25)'];

  // Find the video embed container
  let videoUrl = '';
  let posterImg = null;

  // Find the first iframe with a YouTube src
  const iframe = element.querySelector('iframe[src*="youtube"]');
  if (iframe) {
    videoUrl = iframe.getAttribute('src');
    // Look for an <img> sibling or parent for poster
    const parentDiv = iframe.parentElement;
    if (parentDiv) {
      posterImg = parentDiv.querySelector('img');
    }
  }

  // Compose the cell content: poster image (if any) above the link
  const cellContent = [];

  // Only add the visible heading (the large hero heading), with correct casing
  const heading = element.querySelector('.h1-heading');
  if (heading) {
    const h2 = document.createElement('h2');
    // Use the original textContent to preserve casing
    h2.textContent = heading.textContent.trim();
    cellContent.push(h2);
  }

  // Add poster image
  if (posterImg) {
    cellContent.push(posterImg);
  }

  // Add video link
  if (videoUrl) {
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    cellContent.push(link);
  }

  // Add subheading paragraph (description below video)
  const subheading = element.querySelector('.subheading');
  if (subheading) {
    const p = document.createElement('p');
    p.textContent = subheading.textContent.trim();
    cellContent.push(p);
  }

  // Add buttons as <a> elements
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup) {
    buttonGroup.querySelectorAll('a').forEach(btn => {
      cellContent.push(btn.cloneNode(true));
    });
  }

  // Only create the block if we have any content
  if (cellContent.length) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      [cellContent]
    ], document);
    element.replaceWith(table);
  }
}
