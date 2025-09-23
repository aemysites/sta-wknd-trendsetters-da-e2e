/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per block requirements
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // Defensive: get all immediate children
  const children = Array.from(element.children);
  // Find tab menu and tab content containers
  const tabMenu = children.find((el) => el.classList.contains('w-tab-menu'));
  const tabContent = children.find((el) => el.classList.contains('w-tab-content'));

  if (!tabMenu || !tabContent) {
    // Fallback: don't replace if structure is unexpected
    return;
  }

  // Get tab labels (anchors)
  const tabLinks = Array.from(tabMenu.querySelectorAll(':scope > a'));
  // Get tab panes (content)
  const tabPanes = Array.from(tabContent.querySelectorAll(':scope > .w-tab-pane'));

  // Map tab labels to their corresponding content panes by data-w-tab
  tabLinks.forEach((tabLink) => {
    // Tab label: use the inner div or the anchor text
    let tabLabel = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv) {
      tabLabel = labelDiv.textContent.trim();
    } else {
      tabLabel = tabLink.textContent.trim();
    }

    // Find the corresponding pane by data-w-tab
    const tabName = tabLink.getAttribute('data-w-tab');
    const pane = tabPanes.find((p) => p.getAttribute('data-w-tab') === tabName);
    let tabContentCell = '';
    if (pane) {
      // Use the inner grid as the content if present, else the pane itself
      const grid = pane.querySelector('.w-layout-grid');
      tabContentCell = grid || pane;
    }
    rows.push([tabLabel, tabContentCell]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
