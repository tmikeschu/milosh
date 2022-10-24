import { useEffect } from "react";
import { useLocalStorage } from "react-use";
import { SAVED_PLANS_KEY } from "../components/constants";
import { Day, useStore } from "../store";

export function useLegacySavedPlans() {
  const store = useStore();
  const [savedPlans = [], setSavedPlans] = useLocalStorage<
    Record<Day, number>[]
  >(SAVED_PLANS_KEY, []);
  const hasConverted = savedPlans.length === 0;

  useEffect(() => {
    if (!hasConverted) {
      useStore.setState({ savedPlans: [...store.savedPlans, ...savedPlans] });
      setSavedPlans([]);
    }
  }, [hasConverted]);
}
