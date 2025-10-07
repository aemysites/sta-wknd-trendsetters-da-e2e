/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must match block name exactly
  const headerRow = ['Tabs (tabs22)'];

  // Find tab menu and tab content containers
  const tabMenu = element.querySelector('[role="tablist"]');
  const tabContent = element.querySelector('.w-tab-content');

  if (!tabMenu || !tabContent) return;

  // Get tab labels (anchors inside tabMenu)
  const tabLinks = Array.from(tabMenu.querySelectorAll('[role="tab"]'));
  // Get tab panes (direct children of tabContent)
  const tabPanes = Array.from(tabContent.children);

  if (tabLinks.length !== tabPanes.length) return;

  // Build rows: each row is [tab label (plain text), tab content]
  const rows = tabLinks.map((tabLink, idx) => {
    // Tab label: use only the text content (plain text)
    let labelEl = tabLink.querySelector('div') || tabLink;
    const label = labelEl.textContent.trim();

    // Tab content: use the entire tab pane's content
    const pane = tabPanes[idx];
    let contentEl = pane.children.length === 1 ? pane.children[0] : pane;

    return [label, contentEl];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(block);
}
