/* global WebImporter */
export default function parse(element, { document }) {
  if (!element) return;

  // Block header row must match spec
  const headerRow = ['Tabs (tabs22)'];

  // Find tab menu and tab links
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('a')) : [];

  // Find tab content and panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.children) : [];

  // Defensive: If tabs or panes missing, do nothing
  if (!tabLinks.length || !tabPanes.length) return;

  // Compose rows: each tab label and its content
  const rows = tabLinks.map((tabLink, i) => {
    // Tab label: use text from child div if present
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    label = labelDiv ? labelDiv.textContent.trim() : tabLink.textContent.trim();

    // Tab content: reference the main grid inside the pane
    let content = '';
    const pane = tabPanes[i];
    if (pane) {
      // Find the grid layout inside the pane
      const grid = pane.querySelector('.w-layout-grid');
      content = grid || pane;
    }
    return [label, content];
  });

  // Compose table data
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block table
  element.replaceWith(block);
}
