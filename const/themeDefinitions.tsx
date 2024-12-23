import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
    text: "#000000",
    muted: "#6b7280",
    primary: "#6200ee",
    card: "#f5f5f5",
    border: "#dddddd",
    notification: "#ff80ab",
    // Finance-specific colors
    success: "#4caf50", // Green for profits or positive values
    danger: "#f44336", // Red for losses or negative values
    neutral: "#ff9800", // Orange for pending or in-progress
    accent: "#03a9f4", // Light blue for highlights or actions
    header: "#e0e0e0", // Light grey for headers
    footer: "#bdbdbd", // Darker grey for footers
    chartBackground: "#f1f8e9", // Subtle green for charts

    // UI components
    buttonBackground: "#6200ee", // Primary button background
    buttonText: "#ffffff", // Primary button text
    inputBackground: "#ffffff", // Background for inputs
    inputText: "#000000", // Text color in inputs
    placeholderText: "#b0bec5", // Placeholder text in inputs
    linkText: "#03a9f4", // Link text color
    divider: "#eeeeee", // Divider lines
    shadow: "#00000020", // Light shadow for elements

    // Navigation specific
    tabBarBackground: "#ffffff", // Tab bar background color
    tabBarActive: "#6200ee", // Active tab color
    tabBarInactive: "#757575", // Inactive tab color
  },
};

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#121212",
    text: "#ffffff",
    muted: "#6b7280",
    primary: "#bb86fc",
    card: "#1e1e1e",
    border: "#272727",
    notification: "#cf6679",
    // Finance-specific colors
    success: "#4caf50", // Green for profits or positive values
    danger: "#ef5350", // Slightly muted red for losses
    neutral: "#ffb74d", // Softer orange for pending or in-progress
    accent: "#29b6f6", // Bright blue for highlights or actions
    header: "#212121", // Dark grey for headers
    footer: "#424242", // Lighter grey for footers
    chartBackground: "#263238", // Subtle dark blue for charts

    // UI components
    buttonBackground: "#bb86fc", // Primary button background
    buttonText: "#000000", // Primary button text
    inputBackground: "#333333", // Background for inputs
    inputText: "#ffffff", // Text color in inputs
    placeholderText: "#888888", // Placeholder text in inputs
    linkText: "#bb86fc", // Link text color
    divider: "#3c3c3c", // Divider lines
    shadow: "#00000080", // Darker shadow for elements

    // Navigation specific
    tabBarBackground: "#121212", // Tab bar background color
    tabBarActive: "#bb86fc", // Active tab color
    tabBarInactive: "#757575", // Inactive tab color
  },
};

// Dynamically export colors based on the system or manual mode
export const getColors = (isDarkMode) => {
  const theme = isDarkMode ? CustomDarkTheme : LightTheme;
  return theme.colors;
};

