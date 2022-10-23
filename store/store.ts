import produce from "immer";
import create from "zustand";
import { persist } from "zustand/middleware";

export const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type Day = typeof DAYS[number];

export type Plan = Record<Day, number>;

export type StoreEffect = {
  setSelectedDay: (day: Day | null) => void;
  setDay: (val: { day: Day; value: number }) => void;
  reset: () => void;
  addPlan: (plan: Plan) => void;
  removePlan: (index: number) => void;
};

export type Store = StoreEffect &
  Plan & {
    selectedDay: Day | null;
    savedPlans: Plan[];
  };

export const useStore = create<Store>()(
  persist(
    (set, _get) => {
      return {
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0,
        sunday: 0,
        savedPlans: [],
        setDay: ({ day, value }) => set({ [day]: value }),
        selectedDay: null,
        setSelectedDay: (day) => set({ selectedDay: day }),
        addPlan: (plan) =>
          set((current) => ({ savedPlans: [...current.savedPlans, plan] })),
        removePlan: (index) => {
          set(({ savedPlans }) => {
            const updated = produce(savedPlans, (draft) => {
              draft.splice(index, 1);
            });
            return { savedPlans: updated };
          });
        },

        reset: () =>
          set(
            DAYS.reduce((acc, el) => {
              acc[el] = 0;
              return acc;
            }, {} as Plan)
          ),
      };
    },

    {
      name: "milosh",
    }
  )
);

export const StoreUtils = {
  getMax: (store: Store): number => Math.max(...DAYS.map((day) => store[day])),
  getTotal: <P extends Plan>(plan: P): number =>
    DAYS.reduce((total, day) => total + plan[day], 0),
  getPlan: (store: Store): Plan =>
    DAYS.reduce((acc, el) => {
      acc[el] = store[el];
      return acc;
    }, {} as Plan),
};
