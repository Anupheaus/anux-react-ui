import { createContext, RefObject } from 'react';
import { IMap } from 'anux-common';

export interface ITooltipContext {
  delay: number;
  animationDuration: number;
  hostElementRef: RefObject<HTMLElement>;
}

export interface ITooltipsContext extends IMap<ITooltipContext> { }

export const TooltipsContext = createContext<ITooltipsContext>({});
