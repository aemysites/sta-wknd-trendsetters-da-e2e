/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const container = element.querySelector('.container');
  if (!container) return;
  const gridLayout = container.querySelector('.grid-layout');
  if (!gridLayout) return;

  // Get the three main column groups
  const gridChildren = Array.from(gridLayout.children);

  // 1. Feature card (first <a>)
  const featureCard = gridChildren.find((el) => el.tagName === 'A');

  // 2. Stacked cards (div with two <a>s)
  const stackedDiv = gridChildren.find(
    (el) => el.classList.contains('flex-horizontal') && el.querySelectorAll(':scope > a').length === 2
  );
  const stackedCards = stackedDiv ? Array.from(stackedDiv.querySelectorAll(':scope > a')) : [];

  // 3. Text cards (div with multiple <a>s and dividers)
  const textDiv = gridChildren.find(
    (el) => el.classList.contains('flex-horizontal') && el.querySelectorAll(':scope > a').length > 2
  );
  const textCards = textDiv ? Array.from(textDiv.querySelectorAll(':scope > a')) : [];

  // Compose the table rows
  const headerRow = ['Columns block (columns37)'];
  const secondRow = [featureCard, stackedCards, textCards];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    secondRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
