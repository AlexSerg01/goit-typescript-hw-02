import React from "react";

interface LoadMoreBtnProps {
  onLoadMore: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => (
  <button onClick={onLoadMore}>Load More</button>
);

export default LoadMoreBtn;
