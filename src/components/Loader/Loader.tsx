import { FC } from "react";
import css from "./Loader.module.css";

import { BallTriangle } from "react-loader-spinner";

const Loader: FC = () => {
  return (
    <BallTriangle
      height={100}
      color="#blueviolet"
      ariaLabel="ball-triangle-loading"
      wrapperClass={css.loader}
    ></BallTriangle>
  );
};

export default Loader;
