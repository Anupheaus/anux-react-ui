import { createTypeStyle, cssRaw, cssRule } from 'typestyle';
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
  cssRule: typeof cssRule;
  cssRaw: typeof cssRaw;
}

interface ICreateStylesConfig {
  name: string;
  priority: number;
  importedFonts?: string[];
}

export function createStyle({
  name,
  priority,
  importedFonts = [],
}: ICreateStylesConfig): StyleDelegate {
  const styleTag = document.createElement('style');
  styleTag.setAttribute('data-styles-for', name);
  registerStyleTag(styleTag, priority);
  const instance = createTypeStyle(styleTag);
  const result: StyleDelegate = (...objects: IStyleObject[]) => instance.style(...objects);
  result.cssRule = instance.cssRule;
  result.cssRaw = instance.cssRaw;
  if (importedFonts.length > 0) { importedFonts.forEach(url => instance.cssRaw(`@import url('${url}');`)); }
  return result;
}

export function classNames(...objects: string[]): string {
  const result = objects.filter(is.stringAndNotEmpty).join(' ');
  if (result.length === 0) { return undefined; }
  return result;
}
