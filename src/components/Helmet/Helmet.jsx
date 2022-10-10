import React, { useEffect } from "react";
import PropTypes from "prop-types";
const Helmet = (props) => {
  document.title = props.title;
  useEffect(() => {
  }, []);
  return <div>{props.children}</div>;
};

Helmet.prototype = {
  title: PropTypes.string.isRequired,
};

export default Helmet;
