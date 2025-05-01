import React from 'react';
import { useState } from 'react';
import SunIcon from '../assets/icons/SunIcon';
import MoonIcon from '../assets/icons/MoonIcon';

export default function ThemeSwitcher() {
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const [theme, setTheme] = useState(localStorage.getItem('theme') || systemTheme);

  function onChangeThemeHandler() {
    setTheme((prevState) => {
      const newTheme = prevState === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  return (
    <label className="swap swap-rotate rounded-full border p-1">
      {/* this hidden checkbox controls the state */}
      <input
        type="checkbox"
        className="theme-controller"
        value="winter"
        checked={theme == 'light' ? true : false}
        onChange={() => onChangeThemeHandler()}
      />

      <SunIcon />
      <MoonIcon />
    </label>
  );
}
