import LazyLoading from "../components/lazyLoading";

const wrapWithLazy = (Component) => (
  <LazyLoading>
    <Component />
  </LazyLoading>
);

export default wrapWithLazy;
