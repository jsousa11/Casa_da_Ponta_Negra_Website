import React from "react";
import { Link } from "react-router-dom";
import { site } from "../config/site";

// Abre o motor de reservas quando existir; até lá, a página /book
const BookButton = ({ className = "btn btn--primary", children, ...rest }) =>
  site.bookingEngineUrl ? (
    <a href={site.bookingEngineUrl} target="_blank" rel="noopener noreferrer" className={className} {...rest}>
      {children}
    </a>
  ) : (
    <Link to="/book" className={className} {...rest}>
      {children}
    </Link>
  );

export default BookButton;
