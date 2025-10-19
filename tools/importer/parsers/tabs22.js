/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as required
  const headerRow = ['Tabs (tabs22)'];

  // Find the tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // Get all tab triggers (anchors)
  const tabLinks = Array.from(tabMenu.querySelectorAll('.w-tab-link'));
  // Get all tab panels (content panes)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: Only process as many tabs as we have both triggers and content for
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  // Build rows: each row is [tab label, tab content]
  const rows = [];
  for (let i = 0; i < tabCount; i++) {
    // Tab label: get the text content of the tab trigger (may be inside a div)
    let label = tabLinks[i].textContent.trim();
    // Tab content: use the entire content pane's first child (the grid)
    // Defensive: if the pane has a grid, use it; otherwise, use the pane itself
    let contentElem = tabPanes[i].querySelector('.w-layout-grid') || tabPanes[i];
    rows.push([label, contentElem]);
  }

  // Compose table data
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
