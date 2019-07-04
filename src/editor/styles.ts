import { style, flex } from '../styles';

export default {

  root: style(flex.content.stack),

  toolbar: {

    root: style({
      ...flex.content.wrap,
      flexWrap: 'nowrap',
      marginTop: 'auto',
    }),

    customContainer: style({
      ...flex.full.wrap,
      flexWrap: 'nowrap',
    }),

  },

};

