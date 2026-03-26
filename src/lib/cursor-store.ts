import { create } from "zustand";

export type CursorState = "default" | "link" | "project" | "text";

interface CursorStore {
  state: CursorState;
  label: string;
  isVisible: boolean;
  setState: (state: CursorState, label?: string) => void;
  setVisible: (visible: boolean) => void;
  reset: () => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  state: "default",
  label: "",
  isVisible: true,
  setState: (state, label = "") => set({ state, label }),
  setVisible: (isVisible) => set({ isVisible }),
  reset: () => set({ state: "default", label: "" }),
}));
