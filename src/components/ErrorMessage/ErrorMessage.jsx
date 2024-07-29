import React from "react";
import s from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => (
  <div className={s.error}>
    <p>{message}</p>
  </div>
);

export default ErrorMessage;
