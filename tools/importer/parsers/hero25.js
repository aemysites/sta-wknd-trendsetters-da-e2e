/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const children = Array.from(grid.children);

  // Find the .h1-heading div for the title
  const title = children.find(el => el.classList.contains('h1-heading'));

  // Find the video/image wrapper
  const mediaWrapper = children.find(el => el.classList.contains('utility-position-relative'));
  let backgroundMedia = '';
  if (mediaWrapper) {
    // The media wrapper contains a div with img and iframe
    const embedDiv = mediaWrapper.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      // If there's an image, use it as the background image
      const img = embedDiv.querySelector('img');
      if (img) {
        backgroundMedia = img.cloneNode(true);
      }
    }
  }

  // Find the subheading (paragraph)
  let subheading = '';
  const subheadingWrapper = children.find(el => el.querySelector('p.subheading'));
  if (subheadingWrapper) {
    subheading = subheadingWrapper.querySelector('p.subheading').cloneNode(true);
  }

  // Find the CTA buttons
  let ctas = [];
  const buttonGroup = children.find(el => el.classList.contains('button-group'));
  if (buttonGroup) {
    ctas = Array.from(buttonGroup.querySelectorAll('a')).filter(a => a.href && a.textContent && a.href !== 'about:blank#').map(a => a.cloneNode(true));
  }

  // Compose the content cell: include all text content from the grid in order
  const contentCell = document.createElement('div');
  if (title) contentCell.appendChild(title.cloneNode(true));
  if (subheading) contentCell.appendChild(subheading);
  if (ctas.length) {
    const btnGroup = document.createElement('div');
    ctas.forEach(btn => btnGroup.appendChild(btn));
    contentCell.appendChild(btnGroup);
  }

  // Compose the table
  const headerRow = ['Hero (hero25)'];
  const imageRow = [backgroundMedia ? backgroundMedia : ''];
  const contentRow = [contentCell.childNodes.length ? contentCell : ''];

  const rows = [
    headerRow,
    imageRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
