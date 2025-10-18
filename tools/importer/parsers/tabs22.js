/* global WebImporter */
export default function parse(element, { document }) {
  // Tabs (tabs22) block parsing
  // 1. Find tab headers (labels)
  // 2. Find tab content panels
  // 3. Build table: header row, then one row per tab (label, content)

  // Find tab menu container (tab headers)
  const tabMenu = Array.from(element.children).find((el) => el.classList.contains('w-tab-menu'));
  // Find tab content container
  const tabContent = Array.from(element.children).find((el) => el.classList.contains('w-tab-content'));

  // Defensive: If not found, do nothing
  if (!tabMenu || !tabContent) return;

  // Get tab labels
  const tabLinks = Array.from(tabMenu.querySelectorAll('[role="tab"]'));
  // Get tab panes
  const tabPanes = Array.from(tabContent.querySelectorAll('[role="tabpanel"]'));

  // Defensive: If mismatch, only process up to the minimum number
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Tabs (tabs22)']);

  for (let i = 0; i < tabCount; i++) {
    // Tab label: Use the text content of the tab link's child div if present, else fallback to tab link text
    let label = '';
    const labelDiv = tabLinks[i].querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLinks[i].textContent.trim();
    }

    // Tab content: Use the entire content block inside the tab pane
    // Defensive: If the pane has a grid, use that; else use the pane itself
    let contentBlock = tabPanes[i].querySelector('.w-layout-grid') || tabPanes[i];

    rows.push([label, contentBlock]);
  }

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
