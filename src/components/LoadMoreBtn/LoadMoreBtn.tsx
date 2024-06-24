import React from "react";
import css from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <button onClick={onLoadMore} className={css.btn}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
