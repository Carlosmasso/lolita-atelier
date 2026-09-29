import { useSyncExternalStore } from "react";
import { locationStore, transitionStore } from "./router";

export const useLocation = () => useSyncExternalStore(locationStore.subscribe, locationStore.get);
export const useTransitionSlug = () => useSyncExternalStore(transitionStore.subscribe, transitionStore.get);
