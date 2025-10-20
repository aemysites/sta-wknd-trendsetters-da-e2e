/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find tab menu (tab headers) and tab content panels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? tabMenu.querySelectorAll('.w-tab-link') : [];
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? tabContent.querySelectorAll('.w-tab-pane') : [];

  // Defensive: If not found, abort
  if (!tabLinks.length || !tabPanes.length) return;

  // 2. Build rows: header row first, then one row per tab (label, content)
  const rows = [];
  // Header row - must match block name exactly
  rows.push(['Tabs (tabs22)']);

  // 3. For each tab, get label and content
  tabLinks.forEach((tabLink, idx) => {
    // Tab label: Get the text content from the tab link
    let label = tabLink.textContent.trim();
    // Tab content: Find the corresponding pane
    const pane = tabPanes[idx];
    let content = null;
    if (pane) {
      // Use the first child of pane (usually a grid div), or pane itself
      const grid = pane.querySelector('.w-layout-grid') || pane;
      // Reference the existing element, do not clone or create new
      content = grid;
    }
    rows.push([label, content]);
  });

  // 4. Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
