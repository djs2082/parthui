import Loader from "./Loader";
interface LoaderProps {
  count: number;
  progress?: number;
}
export const BasicLoader = (props: LoaderProps) => (
  <Loader type="basic" {...props} />
);
export const LoveLoader = (props: LoaderProps) => (
  <Loader type="love" {...props} />
);
