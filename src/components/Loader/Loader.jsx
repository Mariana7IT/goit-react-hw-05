import React from "react";
import { ThreeDots } from "react-loader-spinner";
import s from "./Loader.module.css";

const LoadMoreLoader = ({ onClick, isLoading }) => (
  <div className={s.container}>
    {isLoading ? (
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#00BFFF"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    ) : (
      <button type="button" className={s.loadMoreBtn} onClick={onClick}>
        Load More
      </button>
    )}
  </div>
);

export default LoadMoreLoader;
