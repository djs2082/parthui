import CustomButton from "./Button";
import { CustomButtonProps } from "./types";
export const PrimaryButton = (props: CustomButtonProps) => (
  <CustomButton {...props} type="primary" />
);
export const SecondaryButton = (props: CustomButtonProps) => (
  <CustomButton {...props} type="secondary" />
);
