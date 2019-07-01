import { FunctionComponent } from 'react';

const harnessDetailsSymbol = Symbol('harness-details');

export interface IHarnessDetails {
    name: string;
}

export function createHarness<TComponent extends FunctionComponent>(details: IHarnessDetails, component: TComponent): TComponent {
    component[harnessDetailsSymbol] = details;
    const a: (something: string) => void = (b) => b + b;
    return component;
}
