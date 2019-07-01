import { chain, ChainStylesDelegate, ChainFunctionDelegate } from './chain';
import { CSSProperties } from 'react';

type FlexAlignments = 'flex-start' | 'flex-end' | 'center';

interface IFlexAlignments {
  horizontal?: FlexAlignments;
  vertical?: FlexAlignments;
}

function align(styles: CSSProperties) {
  const alignItems = (value: FlexAlignments): CSSProperties => value ? { alignItems: value } : {};
  const justifyContent = (value: FlexAlignments): CSSProperties => value ? { justifyContent: value } : {};

  return (alignments: IFlexAlignments) => ({
    ...styles,
    ...(styles.flexDirection === 'column' ? alignItems(alignments.horizontal) : justifyContent(alignments.horizontal)),
    ...(styles.flexDirection === 'row' ? alignItems(alignments.vertical) : justifyContent(alignments.vertical)),
  });
}

const wrapOrStack = (styles: ChainStylesDelegate, func: ChainFunctionDelegate) => ({
  wrap: {
    ...styles({
      flexDirection: 'row',
      flexWrap: 'wrap',
    }),
    align: func(align),
  },
  stack: {
    ...styles({
      flexDirection: 'column',
    }),
    align: func(align),
  },
});

export const flex = chain((styles, func) => ({
  ...styles({
    display: 'flex',
  }),
  full: {
    ...styles({
      flex: 'auto',
    }),
    ...wrapOrStack(styles, func),
  },
  content: {
    ...styles({
      flex: 'none',
    }),
    ...wrapOrStack(styles, func),
  },
}));
