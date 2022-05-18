interface LoadableComponentProps {
  loading: boolean;
  children: JSX.Element;
  placeholder: JSX.Element;
}

const LoadableComponent = ({
  loading,
  placeholder,
  children,
}: LoadableComponentProps): JSX.Element => {
  if (loading) {
    return placeholder;
  }
  return children;
};

export default LoadableComponent;
