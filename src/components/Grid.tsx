import React, { cloneElement, ReactElement, ReactNode } from "react";

interface IGridProps {
  children: ReactNode;
}
const renderGrid = (children: ReactNode) => {
  const childrenWithRowClass = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return cloneElement(child, {
        className: `${child.props.className || ""} row`.trim(),
      });
    }
    return child;
  });
  return (
    <>
      <section className="container">{childrenWithRowClass}</section>
    </>
  );
};
export function Grid({ children }: IGridProps): ReactElement {
  return renderGrid(children);
}
