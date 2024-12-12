import { loaderType } from "../types";

import basicTheme from "./basicTheme";
import loveTheme from "./loveTheme";

export const getTheme = (type: loaderType) => {
  switch (type) {
    case "love":
      return loveTheme;
    case "shadi":
      return loveTheme;
    default:
      return basicTheme;
  }
};
