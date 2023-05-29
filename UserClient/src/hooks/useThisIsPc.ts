import { useAppSelector } from "../lib/redux/hooks";
import { setConfigThisIsPc } from "../lib/redux/slices/config";
import store from "../lib/redux/store";

/**
 *
 */
window.addEventListener("resize", () => {
  store.dispatch(setConfigThisIsPc(window.innerWidth > 766));
});

/**
 * @returns boolean value describing whether this viewport is a pc or a mobile view
 */
const useThisIsPcHook = () => {
  const thisIsPc = useAppSelector((state) => state.config.thisIsPc);
  return thisIsPc;
};

export default useThisIsPcHook;
