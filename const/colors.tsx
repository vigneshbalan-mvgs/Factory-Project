import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

export const colors = {
  // Backgrounds
  background: "#e0f7fa", // Soft blue background
  inputBackground: "#F8F8F8", // Light input background
  cardBackground: "#FFFFFF", // White background for cards

  // Text
  text: "#000000", // Standard black text
  textWhite: "#FFFFFF", // White text (for dark backgrounds)
  inputText: "#000000", // Black text in input fields
  placeholderText: "#545454", // Grey placeholder text

  // Primary Colors
  primary: "#00796b", // Dark teal (primary color)
  primaryLight: "#4db6ac", // Light teal
  primaryDark: "#004d40", // Darker teal
  primaryLowOpacity: "rgba(0, 121, 107, 0.1)", // Light opacity primary
  primaryMediumOpacity: "rgba(0, 121, 107, 0.5)", // Medium opacity primary
  primaryHighOpacity: "rgba(0, 121, 107, 0.8)", // High opacity primary

  // Secondary Colors
  secondary: "#757575", // Grey
  secondaryLight: "#9e9e9e", // Light grey
  secondaryDark: "#424242", // Dark grey
  secondaryLowOpacity: "rgba(117, 117, 117, 0.1)", // Light opacity grey
  secondaryMediumOpacity: "rgba(117, 117, 117, 0.5)", // Medium opacity grey
  secondaryHighOpacity: "rgba(117, 117, 117, 0.8)", // High opacity grey

  // Buttons
  buttonBackground: "#00796b", // Teal button background
  buttonText: "#FFFFFF", // White button text
  buttonBorder: "#00796b", // Border color for buttons

  // Links
  linkText: "#00796b", // Teal link text
  linkHoverText: "#004d40", // Darker teal for link hover

  // Status Colors
  success: "#4caf50", // Green for success
  danger: "#f44336", // Red for danger
  warning: "#ff9800", // Orange for warning
  info: "#03a9f4", // Blue for informational messages

  // Shadows
  shadowColor: "#000000", // Shadow color for elements
  shadowOpacity: 0.1, // Shadow opacity
  shadowRadius: 4, // Shadow radius
  elevation: 6, // Elevation for elements to cast shadow

  // Borders
  borderColor: "#e0f2f1", // Light teal border
  borderWidth: 1, // Standard border width

  // Misc
  cardBorderRadius: 8, // Border radius for cards
  textFieldBorderRadius: 12, // Border radius for text fields
};

