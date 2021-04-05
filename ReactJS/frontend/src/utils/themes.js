import { SunIcon, MoonIcon } from '@primer/octicons-react';

const colors = {
  Dark: {
    '--lightest': '#e4e6eb',
    '--light': '#b0b3b8',
    '--medium': '#3a3b3c',
    '--medium-transparent': 'rgba(58, 59, 60, 0.5)',
    '--dark': '#242526',
    '--darker': '#18191a',
    '--active': 'rgba(61, 174, 255, 1)',
    '--active-bgr': 'rgba(61, 174, 255, 0.1)',
    '--medium2': '#4a4a4a',
    '--blur': 'rgba(24, 25, 26, 0.2)',
    '--error': '#990000',
    '--error2': '#cc0000',
  },
  Light: {
    '--lightest': '#ffffff',
    '--light': '#f7f7f7',
    '--medium': '#becae6',
    '--dark': '#8b9dc3',
    '--darker': '#3b5998',
    '--active': 'rgba(255, 255, 255, 1)',
    '--active-bgr': 'rgba(255, 255, 255, 0.2)',
    '--medium2': '#b0bad4',
    '--medium-transparent': 'rgba(190, 202, 230, 0.5)',
    '--blur': 'rgba(59, 89, 152, 0.2)',
    '--error': '#cc0000',
    '--error2': '#b30000',
  },
};

const icons = [<MoonIcon />, <SunIcon />];

const themeIcons = Object.fromEntries(Object.keys(colors).map((color, i) => [color, icons[i]]));

const sameColors = {
  '--link1': '#2398eb',
  '--link2': '#29a6ff',
  '--shadow1': 'rgba(0, 0, 0, 0.3)',
  '--shadow2': 'rgba(0, 0, 0, 0.1)',
  '--scroll': 'rgba(255, 255, 255, 0.01)',
  '--scroll1': 'rgba(255, 255, 255, 0.1)',
  '--scroll2': 'rgba(255, 255, 255, 0.15)',
};

Object.values(colors).forEach((holder) => Object.assign(holder, sameColors));

const themes = Object.keys(colors);
const fallback = themes[0];

const getTheme = () => {
  const theme = localStorage.getItem('theme');
  return theme && colors[theme] ? theme : fallback;
};

const saveTheme = (theme = fallback) => localStorage.setItem('theme', theme);

const setColorScheme = (theme = fallback) => {
  Object.entries(colors[theme]).forEach(([color, value]) => {
    document.documentElement.style.setProperty(color, value);
  });
};

const setTheme = (() => {
  setColorScheme(getTheme());

  return (theme) => {
    theme = colors[theme] ? theme : fallback;
    setColorScheme(theme);
    saveTheme(theme);

    return theme;
  };
})();

export { themes, getTheme, setTheme, setColorScheme, themeIcons };
