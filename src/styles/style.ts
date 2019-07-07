import { createTypeStyle } from 'typestyle';
import { is, IMap } from 'anux-common';
import { NestedCSSSelectors, NestedCSSProperties } from 'typestyle/lib/types';
import { registerStyleTag } from './styleTags';

type ConvertToStyleObjects<T> = {
  [P in keyof T]: IStyleObject;
};

interface IStyleObject extends Omit<NestedCSSProperties, '$nest'>, IMap {
  $nest?: ConvertToStyleObjects<NestedCSSSelectors>;
}

export interface StyleDelegate {
  (...objects: IStyleObject[]): string;
  cssRule(name: string, style: IStyleObject): void;
}

interface ICreateStylesConfig {
  name: string;
  priority: number;
}

export function createStyle(config: ICreateStylesConfig): StyleDelegate {
  const styleTag = document.createElement('style');
  styleTag.setAttribute('data-styles-for', config.name);
  registerStyleTag(styleTag, config.priority);
  const instance = createTypeStyle(styleTag);
  const result: StyleDelegate = (...objects: IStyleObject[]) => instance.style(...objects);
  result.cssRule = instance.cssRule;
  return result;
}

export function classNames(...objects: string[]): string {
  const result = objects.filter(is.stringAndNotEmpty).join(' ');
  if (result.length === 0) { return undefined; }
  return result;
}
