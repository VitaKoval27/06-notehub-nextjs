import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderContainer}>
      <div className={css.spinner}></div>
      <p className={css.text}>Loading,please wait...</p>
    </div>
  );
};

export default Loader;