import { useAppSelector } from "../lib/redux/hooks";
import { setNavbarShowState } from "../lib/redux/slices/navbar";
import store from "../lib/redux/store";

const dispatch = store.dispatch;

const useSidebarHook = () => {
  const showSidebar = useAppSelector((state) => state.navbar.showSidebar);
  const showHeader = useAppSelector((state) => state.navbar.showHeader);
  const showFooter = useAppSelector((state) => state.navbar.showFooter);
  const setShowFooter = (value: boolean) => dispatch(setNavbarShowState({ key: "showFooter", value }));
  const setShowHeader = (value: boolean) => dispatch(setNavbarShowState({ key: "showHeader", value }));
  const setShowSidebar = (value: boolean) => dispatch(setNavbarShowState({ key: "showSidebar", value }));
  return {
    showHeader,
    showFooter,
    showSidebar,
    setShowFooter,
    setShowHeader,
    setShowSidebar,
  };
};

export default useSidebarHook;
