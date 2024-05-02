import { useChatContext } from "context/ChatContext";
import React from "react";

export default function ThemeSelector() {
  const { setTheme } = useChatContext();
  const handleChangeTheme = (e) => {
    setTheme(e.target.value);
    localStorage.setItem("theme", e.target.value);
  };

  const availableThemes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
    "dim",
    "nord",
    "sunset",
  ];
  return (
    <div className="dropdown dropdown-left" onChange={handleChangeTheme}>
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="inline-block h-2 w-2 fill-current opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] h-[calc(100vh-20rem)] w-52 overflow-y-auto rounded-box bg-base-300 p-2 shadow-2xl"
      >
        {availableThemes.map((availableTheme) => (
          <li key={availableTheme}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
              aria-label={
                availableTheme.charAt(0).toUpperCase() + availableTheme.slice(1)
              }
              value={availableTheme}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
