import { createTypeStyle } from 'typestyle';
import { is, IMap } from 'anux-common';
import { NestedCSSSelectors, NestedCSSProperties } from 'typestyle/lib/types';
import { setupPage, normalize } from 'csstips';

type ConvertToStyleObjects<T> = {
  [P in keyof T]: IStyleObject;
};

interface IStyleObject extends Omit<NestedCSSProperties, '$nest'>, IMap {
  $nest?: ConvertToStyleObjects<NestedCSSSelectors>;
}

const styleTag = document.createElement('style');
styleTag.setAttribute('data-owner', 'anux-react-ui');

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

ensureStyleTagIsLast();
const instance = createTypeStyle(styleTag);

normalize();
setupPage('app');
instance.cssRule('app', {
  display: 'flex',
  flex: 'auto',
  flexDirection: 'column',
});

export function style(...objects: IStyleObject[]): string {
  if (objects.length === 0) { return ''; }
  return instance.style(...objects);
}

export function classNames(...objects: (string | IStyleObject)[]): string {
  return objects.map(item => is.stringAndNotEmpty(item) ? item : style(item)).filter(is.stringAndNotEmpty).join(' ');
}
