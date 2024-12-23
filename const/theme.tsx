import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";
import { LightTheme, CustomDarkTheme } from "./themeDefinitions";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // Get system theme
  const [isDarkMode, setIsDarkMode] = useState(systemTheme === "dark");

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const currentTheme = isDarkMode ? CustomDarkTheme : LightTheme;
  const colors = currentTheme.colors;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

