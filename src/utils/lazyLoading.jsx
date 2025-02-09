import { Spin } from "antd";
import React from "react";
import PropTypes from "prop-types";

export default function LazyLoading({ children }) {
  return (
    <React.Suspense
      fallback={
        <div className="loading-center" style={{ height: "100vh" }}>
          <Spin />
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}
LazyLoading.propTypes = {
  children: PropTypes.node.isRequired,
};
