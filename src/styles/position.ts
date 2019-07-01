import { chain } from './chain';
import { CSSProperties } from 'react';

function absoluteWithMargin(styles: CSSProperties) {

  const formatMargin = (margin: number | string) => {
    if (typeof (margin) === 'number') { return `${margin}px`; }
    return margin;
  };

  return (margin: number | string) => ({
    ...styles,
    top: formatMargin(margin),
    left: formatMargin(margin),
    right: formatMargin(margin),
    bottom: formatMargin(margin),
  });
}

export const position = chain((styles, func) => ({
  absolute: {
    ...styles({
      position: 'absolute',
    }),
    full: {
      ...styles({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }),
    },
    withMargin: func(absoluteWithMargin),
  },
  relative: {
    ...styles({
      position: 'relative',
    }),
  },
}));
