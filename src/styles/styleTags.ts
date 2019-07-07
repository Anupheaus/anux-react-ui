interface IStyleTagConfig {
  tag: HTMLStyleElement;
  priority: number;
}

const tags: IStyleTagConfig[] = []

let observer: MutationObserver = null;
let ignoreChanges = false;

function refreshOrderOfStyleTags(): void {
  tags
    .orderBy(item => item.priority)
    .forEach(item => document.head.appendChild(item.tag));
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