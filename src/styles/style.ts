import { createTypeStyle } from 'typestyle';
import { is, IMap } from 'anux-common';
import { NestedCSSSelectors, NestedCSSProperties } from 'typestyle/lib/types';

type ConvertToStyleObjects<T> = {
  [P in keyof T]: IStyleObject;
};

interface IStyleObject extends Omit<NestedCSSProperties, '$nest'>, IMap {
  $nest?: ConvertToStyleObjects<NestedCSSSelectors>;
}

function ensureStyleTagIsLast() {
  document.head.appendChild(styleTag);
  let ignoreChange = false;
  const observer = new MutationObserver(() => {
    if (ignoreChange) {
      ignoreChange = false;
    } else {
      ignoreChange = true;
      document.head.appendChild(styleTag);
    }
  });
  observer.observe(document.head, { childList: true, attributes: false, characterData: false, subtree: false });
}

const styleTag = document.createElement('style');
styleTag.setAttribute('data-owner', 'anux-react-ui');
ensureStyleTagIsLast();
const instance = createTypeStyle(styleTag);

export function style(...objects: IStyleObject[]): string {
  if (objects.length === 0) { return ''; }
  return instance.style(...objects);
}

export function classNames(...objects: (string | IStyleObject)[]): string {
  return objects.map(item => is.stringAndNotEmpty(item) ? item : style(item)).filter(is.stringAndNotEmpty).join(' ');
}
