/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children
  const getDirectChildren = (el, selector) => Array.from(el.querySelectorAll(selector)).filter(child => child.parentElement === el);

  // Find tab navigation and content panels
  // Tab menu: usually has role="tablist" or class with 'tab-menu' or 'w-tab-menu'
  const tabMenu = element.querySelector('[role="tablist"], .w-tab-menu');
  // Tab links: anchors or buttons inside tabMenu
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a[role="tab"], button[role="tab"], .w-tab-link')) : [];

  // Tab content container: usually has class 'w-tab-content' or role="tabpanel" in children
  const tabContentContainer = element.querySelector('.w-tab-content, [class*="tab-content"]');
  // Each tab pane: direct children with role="tabpanel" or class 'w-tab-pane'
  const tabPanes = tabContentContainer ? getDirectChildren(tabContentContainer, '.w-tab-pane, [role="tabpanel"]') : [];

  // Defensive: If no tabLinks or tabPanes, do nothing
  if (!tabLinks.length || !tabPanes.length) return;

  // Build rows for table
  const rows = [];
  // Header row: block name
  rows.push(['Tabs (tabs22)']);

  // For each tab, extract label and content
  for (let i = 0; i < tabLinks.length && i < tabPanes.length; i++) {
    const tabLink = tabLinks[i];
    // Tab label: get text content from tabLink (or its child div)
    let label = tabLink.textContent.trim();
    if (!label && tabLink.querySelector('div')) {
      label = tabLink.querySelector('div').textContent.trim();
    }
    // Tab content: use the whole tabPane content
    const tabPane = tabPanes[i];
    // Defensive: If tabPane has a single grid child, use that for content
    let content = tabPane;
    const grid = tabPane.querySelector('.w-layout-grid, [class*="grid-layout"]');
    if (grid && grid.parentElement === tabPane) {
      content = grid;
    }
    rows.push([label, content]);
  }

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
