/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get tab labels and panels
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('[role="tab"]')) : [];
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];

  // Defensive: Ensure equal count
  const tabCount = Math.min(tabLinks.length, tabPanes.length);

  // Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  for (let i = 0; i < tabCount; i++) {
    const tabLabel = tabLinks[i];
    // Use the visible label div inside the tab link
    let labelContent = tabLabel.querySelector('div') || tabLabel;
    // Defensive: clone label if it's not an element
    if (!(labelContent instanceof Element)) {
      labelContent = document.createTextNode(tabLabel.textContent.trim());
    }

    // Tab panel content
    const tabPane = tabPanes[i];
    // Defensive: get the main grid inside the pane (usually contains heading + image)
    let contentGrid = tabPane.querySelector('.w-layout-grid') || tabPane;
    // Place the entire grid (heading + image) in the cell for resilience
    rows.push([
      labelContent,
      contentGrid
    ]);
  }

  // Create table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
