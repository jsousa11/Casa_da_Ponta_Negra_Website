import React from "react";
import { Link } from "react-router-dom";

const BookButton = ({ className = "btn btn--primary", children, ...rest }) => (
  <Link to="/book" className={className} {...rest}>
    {children}
  </Link>
);

export default BookButton;
