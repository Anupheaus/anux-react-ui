interface IStyleTagConfig {
  tag: HTMLStyleElement;
  priority: number;
}

const tags: IStyleTagConfig[] = []

let observer: MutationObserver = null;
let ignoreChanges = false;

function refreshOrderOfStyleTags(): void {
  const children = Array.from(document.head.children);
  let reAppend = false;
  let lastIndex = -1;
  let lastMuiStyleTagIndex = children.clone().reverse().findIndex(item => (item.getAttribute('data-meta') || '').startsWith('Mui'));
  if (lastMuiStyleTagIndex >= 0) { lastMuiStyleTagIndex = children.length - lastMuiStyleTagIndex - 1; }

  tags
    .orderBy(item => item.priority)
    .forEach(item => {
      if (!reAppend) {
        const actualIndex = children.indexOf(item.tag);
        if (actualIndex === -1 || actualIndex < lastIndex || actualIndex < lastMuiStyleTagIndex) { reAppend = true; }
        lastIndex = actualIndex;
      }
      if (reAppend) { document.head.appendChild(item.tag); }
    });
}

function ensureObserverIsActive(): void {
  if (observer) { return; }
  observer = new MutationObserver(() => {
    if (ignoreChanges) { ignoreChanges = false; return; }
    ignoreChanges = true;
    refreshOrderOfStyleTags();
  });
  observer.observe(document.head, { childList: true, attributes: false, characterData: false, subtree: false });
}

export function registerStyleTag(tag: HTMLStyleElement, priority: number): void {
  ensureObserverIsActive();
  tags.push({ tag, priority });
  refreshOrderOfStyleTags();
}