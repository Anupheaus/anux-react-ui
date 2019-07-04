import { FunctionComponent } from 'react';

const harnessDetailsSymbol = Symbol('harness-details');

export interface IHarnessDetails {
  name: string;
}

export function getHarnessDetails(component: FunctionComponent): IHarnessDetails {
  return component && component[harnessDetailsSymbol];
}

export function createHarness<TComponent extends FunctionComponent>(details: IHarnessDetails, component: TComponent): TComponent {
  component[harnessDetailsSymbol] = details;
  component.displayName = `Harness-${details.name}`;
  return component;
}
