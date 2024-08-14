import { Pane } from "tweakpane";

const PARAMS = {
  speed: 0.5,
};
const pane = new Pane();
pane.addBinding(PARAMS, "speed");
export const describeTweakpane = () => pane;
