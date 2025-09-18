/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children by selector
  const getChildren = (parent, selector) => {
    return Array.from(parent.querySelectorAll(':scope > ' + selector));
  };

  // 1. Get tab labels
  // The first child is the tab menu
  const tabMenu = element.querySelector('.w-tab-menu');
  // Defensive: fallback to first child if class not found
  const tabLinks = tabMenu ? getChildren(tabMenu, 'a') : getChildren(element.children[0], 'a');
  const tabLabels = tabLinks.map(link => {
    // Usually the label is a div inside the link
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // 2. Get tab content panes
  // The second child is the tab content container
  const tabContentContainer = element.querySelector('.w-tab-content') || element.children[1];
  // Each child is a .w-tab-pane
  const tabPanes = getChildren(tabContentContainer, 'div');

  // 3. Build rows: [label, content]
  const rows = tabLabels.map((label, idx) => {
    // Defensive: match tab label to pane by index
    const pane = tabPanes[idx];
    // The actual tab content is usually a grid inside the pane
    let content = pane;
    // Try to find the grid inside the pane for more precise content
    const grid = pane ? pane.querySelector('.w-layout-grid') : null;
    if (grid) content = grid;
    return [label, content];
  });

  // 4. Compose table
  const headerRow = ['Tabs (tabs22)'];
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 5. Replace original element
  element.replaceWith(table);
}
