import { buttonTypes, themeTypes } from "../types";

import { basicThemePrimary, basicThemeSecondary } from "./basicTheme";
import {
  shadiBioDataThemePrimary,
  shadiBioDataThemeSecondary,
} from "./shadiBioDataTheme";

export const getTheme = (themeName: themeTypes, type: buttonTypes) => {
  switch (themeName) {
    case "shadi":
      return type === "primary"
        ? shadiBioDataThemePrimary
        : shadiBioDataThemeSecondary;
    default:
      return type === "primary" ? basicThemePrimary : basicThemeSecondary;
  }
};
