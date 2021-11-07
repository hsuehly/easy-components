import { useState, useEffect, useRef } from "react";
import type { FC, ChangeEvent, ReactElement, KeyboardEvent } from "react";
import classNames from "classnames";
import Input, { InputProps } from "../Input/input";
import Icon from "../Icond/icon";
import Transition from "../Transition/transition";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside";
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderoption?: (item: DataSourceType<any>) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = ({
  fetchSuggestions,
  onSelect,
  value,
  renderoption,
  ...props
}) => {
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debounceValue = useDebounce(inputValue, 300);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });

  console.log(suggestions, "suggestions");
  useEffect(() => {
    if (debounceValue && triggerSearch.current) {
        setSuggestions([])
      const result = fetchSuggestions(debounceValue);
      if (result instanceof Promise) {
        console.log("trigerr");
        setLoading(true);

        result.then((data) => {
          setLoading(false);
          setSuggestions(data);
          if(data.length > 0) {
            setShowDropdown(true)
          }
        });
      } else {
        setSuggestions(result);
        setShowDropdown(true)
        if(result.length > 0) {
            setShowDropdown(true)
        }
      }
    } else {
        setShowDropdown(false)
    }
    setHighlightIndex(-1);
  }, [debounceValue, fetchSuggestions]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
  };
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case "ArrowUp":
        highlight(highlightIndex - 1);
        break;
      case "ArrowDown":
        highlight(highlightIndex + 1);
        break;
      case "Escape":
        setShowDropdown(false)
        break;

      default:
        break;
    }
    console.log(e.key);
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderoption ? renderoption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition in={showDropdown || loading}
      animation="zoom-in-top"
      timeout={300}
      onExit={()=> {setSuggestions([])}}
      >
        <ul className="hsueh-suggestion-list">
            {
                loading && <div className="suggstions-loading-icon">
                    <Icon icon={"spinner"} spin></Icon>
                </div>
            }
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "is-active": index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="hsueh-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        {...props}
      />
      {generateDropdown()}
    </div>
  );
};
export default AutoComplete;
