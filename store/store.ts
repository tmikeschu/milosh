import create from "zustand";

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

export type Store = Plan & {
  setDay: (val: { day: Day; value: number }) => void;
  reset: () => void;
};

export const useStore = create<Store>((set) => {
  return {
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
    setDay: ({ day, value }) => set({ [day]: value }),
    reset: () =>
      set(
        DAYS.reduce((acc, el) => {
          acc[el] = 0;
          return acc;
        }, {} as Plan)
      ),
  };
});

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
