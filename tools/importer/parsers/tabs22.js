/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate children by selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Find tab menu and tab content containers
  const children = getDirectChildren(element, 'div');
  if (children.length < 2) return; // Defensive: must have menu and content
  const tabMenu = children[0];
  const tabContent = children[1];

  // 3. Get tab labels
  const tabLinks = getDirectChildren(tabMenu, 'a');
  const tabLabels = tabLinks.map(link => {
    // Find the label div inside each link
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // 4. Get tab panes (content)
  const tabPanes = getDirectChildren(tabContent, 'div');

  // Defensive: Match labels to panes
  const tabCount = Math.min(tabLabels.length, tabPanes.length);
  for (let i = 0; i < tabCount; i++) {
    const label = tabLabels[i];
    const pane = tabPanes[i];
    // Find the grid inside each pane (contains h3 + img)
    const grid = pane.querySelector('.w-layout-grid');
    // Defensive: If grid not found, use pane itself
    const content = grid || pane;
    rows.push([label, content]);
  }

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
