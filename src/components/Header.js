import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu, toggleMode } from "../utils/appSlice";
import {
  YOUTUBE_SEARCH_API,
  YOUTUBE_SEARCH_SUGGESTIONS_API,
} from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";
import { addVideos } from "../utils/mainVideoSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();
  const isDark = useSelector((store) => store.app.isDarkMode);
  const suggestionsRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) setSuggestions(searchCache[searchQuery]);
      else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const handleSearch = async (query) => {
    if (!query) return;
    setSearchQuery(query);
    const data = await fetch(YOUTUBE_SEARCH_API + query);
    const json = await data.json();
    dispatch(addVideos(json.items));
    setShowSuggestions(false);
  };

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_SUGGESTIONS_API + searchQuery);
    const json = await data.json();
    console.log(json);
    setSuggestions(json[1]);
    dispatch(cacheResults({ [searchQuery]: json[1] }));
  };

  const handleBlur = (e) => {
    // Check if the blur event is coming from the suggestion list
    if (!suggestionsRef.current?.contains(e.relatedTarget)) {
      setShowSuggestions(false);
    }
  };

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };
  const toggleThemeHandler = () => {
    dispatch(toggleMode());
  };

  return (
    <div className={`sticky top-0 bg-white z-50 ${isDark ? "dark" : ""}`}>
      <div className="grid grid-flow-col p-4 pb-4 shadow-lg bg-white dark:bg-gray-900 items-center">
        <div className="flex items-center col-span-2 mr-4">
          <img
            className="h-8 cursor-pointer"
            onClick={toggleMenuHandler}
            alt="menu"
            src={
              isDark
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Hamburger_icon_white.svg/1024px-Hamburger_icon_white.svg.png"
                : "https://www.svgrepo.com/show/312300/hamburger-menu.svg"
            }
          />
          <img
            className="h-8 mx-2 cursor-pointer dark:h-24"
            alt="youtubeLogo"
            src={
              isDark
                ? require("../utils/youtube_logo.png")
                : "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
            }
          />
        </div>
        <div className="relative col-span-9 px-10">
          <input
            className="w-3/4 p-2 border border-gray-400 rounded-l-full dark:bg-gray-900 dark:text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={handleBlur}
            type="text"
          />
          <button
            className="dark:bg-gray-900 border p-2 border-gray-400 rounded-r-full bg-gray-100"
            onClick={() => handleSearch(searchQuery)}
          >
            🔍
          </button>
          {showSuggestions && suggestions.length && (
            <div
              ref={suggestionsRef}
              className="absolute bg-white py-2 px-5 w-[37rem] shadow-lg rounded-lg border border-gray-100 dark:bg-gray-900 dark:text-white z-1000"
            >
              <ul>
                {suggestions?.map((suggestion) => (
                  <li
                    key={suggestion}
                    className="py-2 shadow-sm hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearch(suggestion)}
                    tabIndex="0" // Make suggestion list items focusable
                  >
                    🔍 {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-span-1 flex justify-end items-center space-x-4">
          <img
            className="h-8 cursor-pointer"
            src={
              isDark
                ? require("../utils/image.png")
                : "https://cdn-icons-png.flaticon.com/128/12301/12301351.png"
            }
            alt="themicon"
            onClick={toggleThemeHandler}
          />
          <img
            className="h-8 cursor-pointer rounded-full"
            alt="user"
            src={
              isDark
                ? require("../utils/user.png")
                : "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
