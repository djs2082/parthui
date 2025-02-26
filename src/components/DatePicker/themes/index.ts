import { themeTypes } from "./../types";
import basicTheme from "./basicTheme";

export const getTheme = (theme: themeTypes) => {
  switch (theme) {
    case "shadi":
      return basicTheme;
    default:
      return basicTheme;
  }
};
