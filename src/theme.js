export default {
  breakpoints: ['40em', '56em', '64em'],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body:
      ' -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: 'inherit',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#222',
    darkText: '#c2c2c2',
    lightGray: '#dbdbdb',
    darkGray: '#8e8e8e',
    background: '#fafafa',
    primary: '#183f73',
    secondary: '#385084',
    muted: '#808080',
    accent: '#1B998B',
    highlight: '#FFFD82',
    modes: {
      dark: {
        text: '#000a',
        altText: '#090d1f',
        background: '#202020',
        primary: '#14110F',
        secondary: '#710627',
        accent: '#47c1bf',
        muted: '#e6e6e6',
      },
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 5,
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 4,
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 3,
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 2,
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 1,
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: 0,
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
  forms: {
    input: {
      backgroundColor: '#fafafa',
      width: '100%',

      height: '38px',
      padding: '15px 10px',
      borderColor: '#dbdbdb',
      borderRadius: '3px',
      margin: '8px 0',
    },
  },
  buttons: {
    primary: {
      backgroundColor: '#0195f6',
      width: '100%',
      fontSize: '14px',
      margin: '8px 0',
      fontWeight: 700,
    },
    clearBtn: {
      backgroundColor: 'transparent',
      fontSize: '14px',
      margin: '8px 0',
      fontWeight: 700,
      color: '#0195f6',
    },
  },
  images: {
    navBar: {
      width: 25,
      height: 25,
      borderRadius: 99999,
    },
    profileLink: {
      width: 50,
      height: 50,
      borderRadius: 99999,
    },
    postProfileImg: {
      width: 34,
      height: 34,
      borderRadius: 99999,
    },
    suggestionProfileImg: {
      width: 35,
      height: 35,
      borderRadius: 99999,
    },
    primary: {
      cursor: 'pointer',
    },
    mobileImage: {
      width: '100%',
      height: '100%',
    },
  },
};
