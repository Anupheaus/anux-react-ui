import { FunctionComponent } from 'react';

export function addDisplayNameTo(component: FunctionComponent, name: string): void {
  component.displayName = `Anux-React-UI-${name}`;
}

export function pluralise(value: number, zero: string[], one: string[], multiple: string[], delegate: (values: string[]) => string): string {
  const values = ((() => {
    if (value === 0) { return zero; }
    if (value === 1) { return one; }
    return multiple;
  })()).map(result => result.replace(/\$\$/g, value.toString()));
  return delegate(values);
}