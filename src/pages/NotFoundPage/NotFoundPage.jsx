import React from "react";
import { NavLink } from "react-router-dom";
import s from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={s.wrapper}>
      <NavLink to="/" className={s.link}>
        Go Home
      </NavLink>

      <h1 className={s.title}>404 Not found</h1>
      <p className={s.text}>
        We are sorry, but the page is not found, try a little bit later...
      </p>
    </div>
  );
};

export default NotFoundPage;
