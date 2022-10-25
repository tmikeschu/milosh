import produce from "immer";
import create from "zustand";
import { persist } from "zustand/middleware";
import * as R from "remeda";

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

export interface DayConfig {
  day: Day;
  values: number[];
}

export type Plan = Record<Day, number[] | number>;

export interface StoreEffect {
  days: DayConfig[];
  setDay: (val: { day: Day } & { value: number; index: number }) => void;
  reset: () => void;
  addPlan: (plan: Plan) => void;
  removePlan: (index: number) => void;
  splitDay: (day: Day) => void;
}

export interface Store extends StoreEffect {
  savedPlans: Plan[];
}

export const useStore = create<Store>()(
  persist(
    (set, _get) => {
      return {
        days: [
          { day: "monday", values: [0] },
          { day: "tuesday", values: [0] },
          { day: "wednesday", values: [0] },
          { day: "thursday", values: [0] },
          { day: "friday", values: [0] },
          { day: "saturday", values: [0] },
          { day: "sunday", values: [0] },
        ],
        savedPlans: [] as Plan[],
        setDay: ({ day, value, index }) =>
          set((current) => {
            return {
              days: produce(current.days, (draft) => {
                draft.find((d) => d.day === day)!.values[index] = value;
              }),
            };
          }),
        addPlan: (plan) =>
          set((current) => ({
            savedPlans: R.pipe(
              [...current.savedPlans, plan],
              R.sortBy<Plan>([StoreUtils.getTotal, "desc"]),
              R.uniqBy(JSON.stringify)
            ),
          })),
        removePlan: (index) => {
          set(({ savedPlans }) => {
            const updated = produce(savedPlans, (draft) => {
              draft.splice(index, 1);
            });
            return { savedPlans: updated };
          });
        },

        reset: () =>
          set({
            days: DAYS.map((day) => ({ day, values: [0] })),
          }),

        splitDay: (day) =>
          set((current) => {
            return {
              days: produce(current.days, (draft) => {
                const dayConfig = draft.find((d) => d.day === day)!;
                if (dayConfig.values.length === 1) {
                  const [value] = dayConfig.values;
                  if (value >= 8) {
                    dayConfig.values = [value - 3, 3];
                  } else {
                    dayConfig.values.push(0);
                  }
                } else {
                  dayConfig.values = [
                    dayConfig.values.reduce((a, b) => a + b, 0),
                  ];
                }
              }),
            };
          }),
      };
    },
    {
      name: "milosh",
    }
  )
);

export const StoreUtils = {
  getMax: (store: Store): number =>
    Math.max(...DAYS.flatMap((day) => StoreUtils.getDay(store, day).values)),
  getTotal: <P extends Plan>(plan: P): number =>
    DAYS.reduce(
      (total, day) => total + [plan[day]].flat().reduce((a, b) => a + b),
      0
    ),
  getPlan: (store: Store): Plan =>
    DAYS.reduce((acc, day) => {
      acc[day] = StoreUtils.getDay(store, day).values;
      return acc;
    }, {} as Plan),
  getDay: (store: Store, day: Day): DayConfig =>
    store.days.find((d) => d.day === day)!,

  toPlan: (store: Store): Plan =>
    store.days.reduce((acc, day) => {
      acc[day.day] = day.values.reduce((a, b) => a + b, 0);
      return acc;
    }, {} as Plan),

  planToDays: (plan: Plan): DayConfig[] =>
    (Object.entries(plan) as [Day, number[] | number][]).map(
      ([day, values]) => ({ day, values: [values].flat() })
    ),
};
