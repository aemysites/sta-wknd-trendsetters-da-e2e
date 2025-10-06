/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get immediate children by selector
  function getImmediateChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // 1. Header row
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Find tab menu and tab content containers
  // The first child is the tab menu, the second is the tab content
  const children = getImmediateChildren(element, 'div');
  if (children.length < 2) {
    // Defensive: not enough children for tabs block
    return;
  }
  const tabMenu = children[0];
  const tabContent = children[1];

  // 3. Get all tab menu links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a.w-tab-link'));

  // 4. Get all tab panes (content)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // Defensive: If mismatch, bail
  if (tabLinks.length !== tabPanes.length) {
    return;
  }

  // 5. For each tab, create a row: [label, content]
  for (let i = 0; i < tabLinks.length; i++) {
    // Tab label: Use the text content of the inner div if present, else fallback
    let label = '';
    const labelDiv = tabLinks[i].querySelector('div');
    if (labelDiv) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLinks[i].textContent.trim();
    }

    // Tab content: Use the inner content of the tab pane
    // Defensive: If the tab pane has a single grid div, use that
    let contentElem = tabPanes[i];
    const grid = contentElem.querySelector('.w-layout-grid');
    let content;
    if (grid) {
      content = grid;
    } else {
      // fallback: use the tab pane itself
      content = contentElem;
    }

    rows.push([label, content]);
  }

  // 6. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
