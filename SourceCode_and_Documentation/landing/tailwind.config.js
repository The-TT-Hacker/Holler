/*

Tailwind - The Utility-First CSS Framework

A project by Adam Wathan (@adamwathan), Jonathan Reinink (@reinink),
David Hemphill (@davidhemphill) and Steve Schoger (@steveschoger).

View the full documentation at https://tailwindcss.com.

/*
|-------------------------------------------------------------------------------
| Colors                                    https://tailwindcss.com/docs/colors
|-------------------------------------------------------------------------------
*/

let colors = {
  transparent: 'transparent',

  black: '#22292f',
  'grey-darker': '#606f7b',
  'grey-dark': '#8795a1',
  grey: '#b8c2cc',
  'grey-light': '#dae1e7',
  'grey-lighter': '#f1f5f8',
  white: '#ffffff',

  'blue-light': '#f5faff',

  'pink-light': '#ff78cd',

  orange: '#fea31f',
  'orange-light': '#FFF7EA',
  pink: '#e3496b',
  dark: '#141b1d',

  cyan: '#01262f',
};

module.exports = {
  /*
  |-----------------------------------------------------------------------------
  | Colors                                  https://tailwindcss.com/docs/colors
  |-----------------------------------------------------------------------------
  |
  | .error { color: config('colors.red') }
  |
  */

  colors: colors,

  /*
  |-----------------------------------------------------------------------------
  | Screens                      https://tailwindcss.com/docs/responsive-design
  |-----------------------------------------------------------------------------
  |
  | Class name: .{screen}:{utility}
  |
  */

  screens: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1440px',
  },

  /*
  |-----------------------------------------------------------------------------
  | Fonts                                    https://tailwindcss.com/docs/fonts
  |-----------------------------------------------------------------------------
  |
  | Class name: .font-{name}
  | CSS property: font-family
  |
  */

  fonts: {
    display: [
      'Poppins',
      'system-ui',
      'BlinkMacSystemFont',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    sans: [
      'Open Sans',
      'system-ui',
      'BlinkMacSystemFont',
      '-apple-system',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ],
    serif: [
      'Constantia',
      'Lucida Bright',
      'Lucidabright',
      'Lucida Serif',
      'Lucida',
      'DejaVu Serif',
      'Bitstream Vera Serif',
      'Liberation Serif',
      'Georgia',
      'serif',
    ],
    mono: ['Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
  },

  /*
  |-----------------------------------------------------------------------------
  | Text sizes                         https://tailwindcss.com/docs/text-sizing
  |-----------------------------------------------------------------------------
  |
  | Class name: .text-{size}
  | CSS property: font-size
  |
  */

  textSizes: {
    12: '0.75rem',
    14: '0.875rem',
    base: '1rem',
    18: '1.125rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    36: '2.25rem',
    48: '3rem',
    64: '4rem',
    72: '4.5rem',
  },

  /*
  |-----------------------------------------------------------------------------
  | Font weights                       https://tailwindcss.com/docs/font-weight
  |-----------------------------------------------------------------------------
  |
  | Class name: .font-{weight}
  | CSS property: font-weight
  |
  */

  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  /*
  |-----------------------------------------------------------------------------
  | Leading (line height)              https://tailwindcss.com/docs/line-height
  |-----------------------------------------------------------------------------
  |
  | Class name: .leading-{size}
  | CSS property: line-height
  |
  */

  leading: {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    loose: 2,
  },

  /*
  |-----------------------------------------------------------------------------
  | Tracking (letter spacing)       https://tailwindcss.com/docs/letter-spacing
  |-----------------------------------------------------------------------------
  |
  | Class name: .tracking-{size}
  | CSS property: letter-spacing
  |
  */

  tracking: {
    tight: '-0.05em',
    normal: '0',
    wide: '0.05em',
  },

  /*
  |-----------------------------------------------------------------------------
  | Text colors                         https://tailwindcss.com/docs/text-color
  |-----------------------------------------------------------------------------
  |
  | Class name: .text-{color}
  | CSS property: color
  |
  */

  textColors: colors,

  /*
  |-----------------------------------------------------------------------------
  | Background colors             https://tailwindcss.com/docs/background-color
  |-----------------------------------------------------------------------------
  |
  | Class name: .bg-{color}
  | CSS property: background-color
  |
  */

  backgroundColors: colors,

  /*
  |-----------------------------------------------------------------------------
  | Background sizes               https://tailwindcss.com/docs/background-size
  |-----------------------------------------------------------------------------
  |
  | Class name: .bg-{size}
  | CSS property: background-size
  |
  */

  backgroundSize: {
    auto: 'auto',
    cover: 'cover',
    contain: 'contain',
    'full-x': '100% auto',
    'full-y': 'auto 100%',
  },

  /*
  |-----------------------------------------------------------------------------
  | Border widths                     https://tailwindcss.com/docs/border-width
  |-----------------------------------------------------------------------------
  |
  | Class name: .border{-side?}{-width?}
  | CSS property: border-width
  |
  */

  borderWidths: {
    default: '1px',
    '0': '0',
    '2': '2px',
    '4': '4px',
    '8': '8px',
  },

  /*
  |-----------------------------------------------------------------------------
  | Border colors                     https://tailwindcss.com/docs/border-color
  |-----------------------------------------------------------------------------
  |
  | Class name: .border-{color}
  | CSS property: border-color
  |
  */

  borderColors: global.Object.assign({ default: colors['grey-light'] }, colors),

  /*
  |-----------------------------------------------------------------------------
  | Border radius                    https://tailwindcss.com/docs/border-radius
  |-----------------------------------------------------------------------------
  |
  | Class name: .rounded{-side?}{-size?}
  | CSS property: border-radius
  |
  */

  borderRadius: {
    none: '0',
    sm: '.125rem',
    default: '.25rem',
    lg: '.5rem',
    full: '9999px',
  },

  /*
  |-----------------------------------------------------------------------------
  | Width                                    https://tailwindcss.com/docs/width
  |-----------------------------------------------------------------------------
  |
  | Class name: .w-{size}
  | CSS property: width
  |
  */

  width: {
    auto: 'auto',
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
    screen: '100vw',
  },

  /*
  |-----------------------------------------------------------------------------
  | Height                                  https://tailwindcss.com/docs/height
  |-----------------------------------------------------------------------------
  |
  | Class name: .h-{size}
  | CSS property: height
  |
  */

  height: {
    auto: 'auto',
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
    screen: '100vh',
  },

  /*
  |-----------------------------------------------------------------------------
  | Minimum width                        https://tailwindcss.com/docs/min-width
  |-----------------------------------------------------------------------------
  |
  | Class name: .min-w-{size}
  | CSS property: min-width
  |
  */

  minWidth: {
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
    xs: '20rem',
    s: '28rem',
    sm: '30rem',
    md: '40rem',
    lg: '50rem',
    xl: '60rem',
  },

  /*
  |-----------------------------------------------------------------------------
  | Minimum height                      https://tailwindcss.com/docs/min-height
  |-----------------------------------------------------------------------------
  |
  | Class name: .min-h-{size}
  | CSS property: min-height
  |
  */

  minHeight: {
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
    screen: '100vh',
  },

  /*
  |-----------------------------------------------------------------------------
  | Maximum width                        https://tailwindcss.com/docs/max-width
  |-----------------------------------------------------------------------------
  |
  | Class name: .max-w-{size}
  | CSS property: max-width
  |
  */

  maxWidth: {
    auto: 'auto',
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
    xs: '20rem',
    s: '28rem',
    sm: '30rem',
    md: '40rem',
    lg: '50rem',
    xl: '60rem',
  },

  /*
  |-----------------------------------------------------------------------------
  | Maximum height                      https://tailwindcss.com/docs/max-height
  |-----------------------------------------------------------------------------
  |
  | Class name: .max-h-{size}
  | CSS property: max-height
  |
  */

  maxHeight: {
    auto: 'auto',
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
    screen: '100vh',
  },

  /*
  |-----------------------------------------------------------------------------
  | Padding                                https://tailwindcss.com/docs/padding
  |-----------------------------------------------------------------------------
  |
  | Class name: .p{side?}-{size}
  | CSS property: padding
  |
  */

  padding: {
    auto: 'auto',
    0: '0',
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
  },

  /*
  |-----------------------------------------------------------------------------
  | Margin                                  https://tailwindcss.com/docs/margin
  |-----------------------------------------------------------------------------
  |
  | Class name: .m{side?}-{size}
  | CSS property: margin
  |
  */

  margin: {
    auto: 'auto',
    0: '0',
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
  },

  /*
  |-----------------------------------------------------------------------------
  | Negative margin                https://tailwindcss.com/docs/negative-margin
  |-----------------------------------------------------------------------------
  |
  | Class name: .-m{side?}-{size}
  | CSS property: margin
  |
  */

  negativeMargin: {
    0: '0',
    1: '1px',
    4: '0.25rem',
    6: '0.375rem',
    8: '0.5rem',
    12: '0.75rem',
    16: '1rem',
    20: '1.25rem',
    24: '1.5rem',
    28: '1.75rem',
    32: '2rem',
    40: '2.5rem',
    48: '3rem',
    64: '4rem',
    80: '5rem',
    96: '6rem',
    112: '7rem',
    128: '8rem',
    192: '12rem',
    224: '14rem',
    256: '16rem',
    512: '32rem',
    '25%': '25%',
    '30%': '30%',
    '40%': '40%',
    '50%': '50%',
    '60%': '60%',
    '70%': '70%',
    '80%': '80%',
    '90%': '90%',
    full: '100%',
  },

  /*
  |-----------------------------------------------------------------------------
  | Shadows                                https://tailwindcss.com/docs/shadows
  |-----------------------------------------------------------------------------
  |
  | Class name: .shadow-{size?}
  | CSS property: box-shadow
  |
  */

  shadows: {
    default: '0 2px 4px 0 rgba(0,0,0,0.10)',
    md: '0 4px 8px 0 rgba(0,0,0,0.12), 0 2px 4px 0 rgba(0,0,0,0.08)',
    'md-pink': '0 4px 8px 0 rgba(255, 82, 191, 0.08), 0 2px 4px 0 rgb(255, 82, 191, 0.08)',
    lg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 5px 15px 0 rgba(0,0,0,0.08)',
    xlg: '0 15px 30px 0 rgba(0,0,0,0.11), 0 9px 25px 0 rgba(0,0,0,0.08)',
    inner: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    outline: '0 0 0 3px rgba(52,144,220,0.5)',
    none: 'none',
  },

  /*
  |-----------------------------------------------------------------------------
  | Z-index                                https://tailwindcss.com/docs/z-index
  |-----------------------------------------------------------------------------
  |
  | Class name: .z-{index}
  | CSS property: z-index
  |
  */

  zIndex: {
    auto: 'auto',
    '0': 0,
    '10': 10,
    '20': 20,
    '30': 30,
    '40': 40,
    '50': 50,
  },

  /*
  |-----------------------------------------------------------------------------
  | Opacity                                https://tailwindcss.com/docs/opacity
  |-----------------------------------------------------------------------------
  |
  | Class name: .opacity-{name}
  | CSS property: opacity
  |
  */

  opacity: {
    '0': '0',
    '25': '.25',
    '50': '.5',
    '75': '.75',
    '100': '1',
  },

  /*
  |-----------------------------------------------------------------------------
  | SVG fill                                   https://tailwindcss.com/docs/svg
  |-----------------------------------------------------------------------------
  |
  | Class name: .fill-{name}
  | CSS property: fill
  |
  */

  svgFill: {
    current: 'currentColor',
  },

  /*
  |-----------------------------------------------------------------------------
  | SVG stroke                                 https://tailwindcss.com/docs/svg
  |-----------------------------------------------------------------------------
  |
  | Class name: .stroke-{name}
  | CSS property: stroke
  |
  */

  svgStroke: {
    current: 'currentColor',
  },

  /*
  |-----------------------------------------------------------------------------
  | Modules                  https://tailwindcss.com/docs/configuration#modules
  |-----------------------------------------------------------------------------
  |
  | Currently supported variants:
  |   - responsive
  |   - hover
  |   - focus
  |   - focus-within
  |   - active
  |   - group-hover
  |
  | To disable a module completely, use `false` instead of an array.
  |
  */

  modules: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColors: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColors: ['responsive', 'hover', 'focus'],
    borderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidths: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive'],
    flexbox: ['responsive'],
    float: ['responsive'],
    fonts: ['responsive'],
    fontWeights: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    leading: ['responsive'],
    lists: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    objectFit: false,
    objectPosition: false,
    opacity: ['responsive'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    resize: ['responsive'],
    shadows: ['responsive', 'hover', 'focus'],
    svgFill: [],
    svgStroke: [],
    tableLayout: ['responsive'],
    textAlign: ['responsive'],
    textColors: ['responsive', 'hover', 'focus'],
    textSizes: ['responsive'],
    textStyle: ['responsive', 'hover', 'focus'],
    tracking: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive'],
    whitespace: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
  },

  /*
  |-----------------------------------------------------------------------------
  | Plugins                                https://tailwindcss.com/docs/plugins
  |-----------------------------------------------------------------------------
  */

  plugins: [
    require('tailwindcss/plugins/container')({
      // center: 'true',
      padding: '1rem',
    }),
    require('tailwindcss-grid')({
      grids: [2, 3, 5, 6, 8, 10, 12],
      gaps: {
        0: '0',
        8: '0.5rem',
        16: '1rem',
        32: '2rem',
        64: '4rem',
        '0-x': '0',
        '8-x': '0.5rem',
        '16-x': '1rem',
        '32-x': '2rem',
        '64-x': '4rem',
        '0-y': '0',
        '8-y': '0.5rem',
        '16-y': '1rem',
        '32-y': '2rem',
        '64-y': '4rem',
      },
      autoMinWidths: {
        8: '0.5rem',
        12: '0.75rem',
        16: '1rem',
        32: '2rem',
        40: '2.5rem',
        48: '3rem',
        64: '4rem',
        80: '5rem',
        96: '6rem',
        112: '7rem',
        128: '8rem',
        192: '12rem',
        224: '14rem',
        256: '16rem',
        512: '32rem',
      },
      variants: ['responsive'],
    }),
  ],

  /*
  |-----------------------------------------------------------------------------
  | Advanced Options         https://tailwindcss.com/docs/configuration#options
  |-----------------------------------------------------------------------------
  */

  options: {
    prefix: '',
    important: false,
    separator: ':',
  },
};
