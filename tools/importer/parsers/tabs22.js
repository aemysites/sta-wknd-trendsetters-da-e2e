/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children with a selector
  function getDirectChildren(parent, selector) {
    return Array.from(parent.children).filter((el) => el.matches(selector));
  }

  // 1. Header row as required
  const headerRow = ['Tabs (tabs22)'];
  const rows = [headerRow];

  // 2. Find tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) {
    // Defensive: abort if structure not as expected
    return;
  }

  // 3. Get all tab links (labels)
  const tabLinks = Array.from(tabMenu.querySelectorAll('.w-tab-link'));
  // 4. Get all tab panes (content)
  const tabPanes = Array.from(tabContent.querySelectorAll('.w-tab-pane'));

  // 5. For each tab, extract label and content
  tabLinks.forEach((tabLink, idx) => {
    // Tab label: use the text content of the inner div, fallback to link text
    let label = '';
    const labelDiv = tabLink.querySelector('div');
    if (labelDiv && labelDiv.textContent) {
      label = labelDiv.textContent.trim();
    } else {
      label = tabLink.textContent.trim();
    }

    // Tab content: match by index (assuming order is preserved)
    let contentCell = '';
    const tabPane = tabPanes[idx];
    if (tabPane) {
      // Use the first direct child of tabPane as the content block (usually a div.grid)
      const contentBlock = tabPane.firstElementChild;
      if (contentBlock) {
        contentCell = contentBlock;
      } else {
        // fallback: use tabPane itself
        contentCell = tabPane;
      }
    }
    rows.push([label, contentCell]);
  });

  // 6. Create the block table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
