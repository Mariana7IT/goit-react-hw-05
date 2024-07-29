import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={s.buttonWrapper}>
      <button className={s.button} onClick={onClick}>
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
