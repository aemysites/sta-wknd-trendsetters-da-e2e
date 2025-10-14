/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Tabs (tabs22)'];

  // Find tab navigation (tab labels)
  const tabMenu = Array.from(element.querySelectorAll('.w-tab-menu a'));
  // Find tab content panels
  const tabContentContainer = element.querySelector('.w-tab-content');
  const tabPanes = tabContentContainer ? Array.from(tabContentContainer.children) : [];

  // Defensive: ensure equal number of tabs and panes
  const tabRows = [];
  for (let i = 0; i < tabMenu.length; i++) {
    // Tab label (extract inner text from the tab link)
    const tabLabelDiv = tabMenu[i].querySelector('div');
    const tabLabel = tabLabelDiv ? tabLabelDiv.textContent.trim() : tabMenu[i].textContent.trim();
    // Tab content (grab the main content block from the pane)
    let tabContent = null;
    if (tabPanes[i]) {
      // Usually the pane contains a grid with heading and image
      // We'll grab the entire grid layout div for resilience
      const grid = tabPanes[i].querySelector('.w-layout-grid');
      tabContent = grid ? grid : tabPanes[i];
    }
    tabRows.push([tabLabel, tabContent]);
  }

  // Compose table
  const cells = [headerRow, ...tabRows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}
