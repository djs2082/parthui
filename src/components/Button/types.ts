export type CustomButtonProps = {
  style?: { [key: string]: string };
  disabled?: boolean;
  disableRipple?: boolean;
  onClick: (e: any) => void;
  children: string;
  className?: string;
  rounded?: boolean;
};
