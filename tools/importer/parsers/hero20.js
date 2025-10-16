/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Background images row
  // Find the grid with images
  const grid = element.querySelector('.desktop-3-column');
  let imagesFragment = document.createDocumentFragment();
  if (grid) {
    // Collect all images in the grid
    const imgs = Array.from(grid.querySelectorAll('img'));
    imgs.forEach(img => imagesFragment.appendChild(img));
  }
  // If no images found, leave cell empty
  const imagesRow = [imagesFragment.childNodes.length ? imagesFragment : ''];

  // 3. Content row (title, subheading, CTA)
  // Find the content container
  const contentContainer = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let contentFragment = document.createDocumentFragment();
  if (contentContainer) {
    // Heading
    const heading = contentContainer.querySelector('h1');
    if (heading) contentFragment.appendChild(heading);
    // Subheading
    const subheading = contentContainer.querySelector('p');
    if (subheading) contentFragment.appendChild(subheading);
    // CTA buttons
    const buttonGroup = contentContainer.querySelector('.button-group');
    if (buttonGroup) {
      // Append all buttons/links inside the button group
      Array.from(buttonGroup.children).forEach(btn => contentFragment.appendChild(btn));
    }
  }
  const contentRow = [contentFragment.childNodes.length ? contentFragment : ''];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imagesRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
