import css from "./SearchBox.module.css";
import type { ChangeEvent } from "react";


interface SearchBoxProps {
  onSearch:  (value: string) => void;
  value:string
}

export default function SearchBox({ onSearch,value }: SearchBoxProps) {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <input
      className={css.input}
      type="text"
      defaultValue={value}
      placeholder="Search notes"
      onChange={handleInputChange}
    />
  );
}