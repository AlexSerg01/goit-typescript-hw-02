import React from "react";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onFind: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onFind }) => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = (event.target as HTMLFormElement).elements.namedItem(
      "search"
    ) as HTMLInputElement;
    if (data.value.length === 0) {
      toast.error("The field is empty!");
      return;
    }
    onFind(data.value);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={submitHandler} className={css.form}>
      <input type="text" name="search" className={css.input} />
      <button type="submit" className={css.button}>
        Search
      </button>
      <Toaster />
    </form>
  );
};

export default SearchBar;
