import { ReactNode } from "react";

export type themeTypes = "basic" | "shadi";

export type CustomModalProps = {
  show: boolean;
  onHide: () => void;
  header: ReactNode;
  body: ReactNode;
  primaryButton?: ReactNode;
  secondaryButton?: ReactNode;
  className?: string;
  style?: { [key: string]: string };
  theme: themeTypes;
};
