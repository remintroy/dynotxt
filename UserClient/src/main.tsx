import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { useFullscreen, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import store from "./lib/redux/store.ts";

const Main = () => {
  /**
   * Color schema for entire app
   * This includes default colors and dark, light themes
   */
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  /**
   * Toggle full screen view mode
   */
  const { toggle: toggleFulScreenMode } = useFullscreen();

  /**
   * short cut for changing the color scheme
   * Used keybord sortcuts for toggle dark and light color schemes
   */
  useHotkeys([
    ["mod+J", () => toggleColorScheme()],
    ["mod+f", () => toggleFulScreenMode()],
  ]);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        theme={{
          colorScheme,
          colors: {
            // override dark colors to change them for all components
            dark: ["#C1C2C5", "#A6A7AB", "#909296", "#5C5F66", "#373A40", "#2C2E33", "#25262B", "#101113", "#1A1B1E", "#141517"],
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Provider store={store}>
          <App />
        </Provider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Main />);
