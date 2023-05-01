import { createContext } from "react";

const ThemeContext = createContext({ dark: false, toggleTheme: () => {} });

export default ThemeContext;
