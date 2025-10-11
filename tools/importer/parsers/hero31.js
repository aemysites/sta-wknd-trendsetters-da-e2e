/* global WebImporter */
export default function parse(element, { document }) {
  // HERO (hero31) block: 1 column, 3 rows
  // Row 1: Block name
  // Row 2: Background image (optional, none in this case)
  // Row 3: Heading, subheading, CTA (optional), supporting content

  // Helper: Get immediate children of main grid
  const grid = element.querySelector('.grid-layout');
  const gridChildren = grid ? Array.from(grid.children) : [];

  // Find heading (h2)
  const heading = gridChildren.find((el) => el.tagName === 'H2');

  // Find rich text paragraphs
  const richTextDiv = gridChildren.find((el) => el.querySelector('.rich-text, .w-richtext'));
  let richText;
  if (richTextDiv) {
    richText = richTextDiv.querySelector('.rich-text, .w-richtext');
  }

  // Find tags (vertical stack)
  const tagsContainer = gridChildren.find((el) => el.classList.contains('flex-vertical'));
  let tags = [];
  if (tagsContainer) {
    tags = Array.from(tagsContainer.querySelectorAll('.tag')).map(tag => tag.cloneNode(true));
  }

  // Find name (author label)
  const nameDiv = gridChildren.find((el) => el.classList.contains('paragraph-xl'));

  // Compose content for row 3
  // Group headline and paragraphs together, and group name/tags together for clarity
  const contentFragment = document.createDocumentFragment();

  if (nameDiv || tags.length) {
    const metaDiv = document.createElement('div');
    if (nameDiv) metaDiv.appendChild(nameDiv.cloneNode(true));
    if (tags.length) {
      const tagsDiv = document.createElement('div');
      tags.forEach(tag => tagsDiv.appendChild(tag));
      metaDiv.appendChild(tagsDiv);
    }
    contentFragment.appendChild(metaDiv);
  }

  if (heading) contentFragment.appendChild(heading.cloneNode(true));
  if (richText) contentFragment.appendChild(richText.cloneNode(true));

  // Table rows
  const headerRow = ['Hero (hero31)'];
  const imageRow = ['']; // No background image present
  const contentRow = [contentFragment];

  // Create table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
