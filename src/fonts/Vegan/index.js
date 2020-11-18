import VeganWoff2 from './VeganStylePersonalUse-5Y58.woff2';

const Vegan = {
    fontFamily: 'Vegan',
    fontStyle: 'normal',
    fontDisplay: 'swap',
    fontWeight: 500,
    src: `
    local('Vegan'),
    local('Vegan-Regular'),
    url(${VeganWoff2}) format('woff2')
    `,
    unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

export default Vegan;
