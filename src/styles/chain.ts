import { IMap } from 'anux-common';
import { CSSProperties } from 'react';

type FuncType = (...args: unknown[]) => IChainable;

export interface IChainable extends IMap<IChainable | FuncType> { }

const Style = Symbol('style');

type ArgumentTypes<T> = T extends (...args: infer U) => CSSProperties ? U : never;
type ReplaceReturnType<T, TNewReturn> = (...a: ArgumentTypes<T>) => TNewReturn;

export type ChainStylesDelegate = (styles: CSSProperties) => IMap;
export type ChainFunctionDelegate = <F extends (...args: unknown[]) => CSSProperties,
  T extends IChainable>(func: (current: CSSProperties) => F, chain?: T) => ReplaceReturnType<F, T>;

function attachStyles(style: CSSProperties): IMap {
  const obj = {};
  Object.defineProperty(obj, Style, {
    value: style,
    enumerable: true,
    configurable: false,
    writable: false,
  });
  return obj;
}

function invokeFunction<F extends (...args: unknown[]) => CSSProperties, T extends IChainable>(func: (currentStyles: CSSProperties) => F,
  chainResult: T = {} as unknown as T): ReplaceReturnType<F, T> {
  const returnFunc = (styles: CSSProperties, ...args: unknown[]) => {
    styles = func(styles)(...args);
    const newChainResult = Object.merge({}, chainResult);
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    processValue(newChainResult, styles);
    return newChainResult;
  };
  return returnFunc as any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

function hideKey(value: Object, key: string): void {
  const actualValue = value[key];
  Object.defineProperty(value, key, {
    value: actualValue,
    enumerable: false,
    configurable: true,
    writable: false,
  });
}

function addStyles(value: Object, styles: CSSProperties): void {
  if (!styles) { return; }
  delete value[Style];
  Object.keys(styles)
    .forEach(key => Object.defineProperty(value, key, {
      value: styles[key],
      enumerable: true,
      configurable: true,
      writable: false,
    }));
}

function processFunction(value: Object, key: string, styles: CSSProperties): void {
  const func = value[key];
  Object.defineProperty(value, key, {
    value: (...args: unknown[]) => func(styles, ...args),
    enumerable: false,
    configurable: true,
    writable: false,
  });
}

function processValue(value: Object, styles?: CSSProperties) {
  styles = { ...styles, ...value[Style] };
  delete value[Style];
  Object.keys(value)
    .forEach(key => {
      hideKey(value, key);
      if (typeof (value[key]) === 'function') {
        processFunction(value, key, styles);
      } else {
        processValue(value[key], styles);
      }
    });
  addStyles(value, styles);
}

export function chain<T extends IChainable>(delegate: (styles: ChainStylesDelegate, func: ChainFunctionDelegate) => T): T {
  const result = delegate(attachStyles, invokeFunction);
  processValue(result, null);
  return result;
}
