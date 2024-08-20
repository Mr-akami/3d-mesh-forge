import { atom, createStore } from "jotai";

export const store = createStore();

export const positionsAtom = atom<number[]>([]);
export const indicesAtom = atom<number[]>([]);
export const normalsAtom = atom<number[]>([]);
export const updateTriggerAtom = atom<number>(0);
