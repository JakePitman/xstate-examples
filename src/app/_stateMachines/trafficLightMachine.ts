import { setup, assign, createActor } from "xstate";

export const trafficLightMachine = setup({
  types: {
    context: {} as { isOn: boolean },
    events: {} as
      | { type: "CHANGE" }
      | { type: "TURN_OFF" }
      | { type: "TURN_ON" }
      | { type: "TOGGLE_ON_OFF" },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgGEAJAQQDkBxAUQG0AGAXUVAAcB7WXAC64e+TiAAeiALQBGAGwyAdACYFAdhkBONQGYZOljrUAaEAE9EMgKwAWRQA4ZM+1bXKbynZquaAvr9M0LDxCUgAVAFUAJRoAfQB5ADFE1g4kEF5+IRExSQR9FR05bTk5ex0dGzk1NStTC3yWNRU1G109XRtbGTV-QIwcAmISSJiEmlSxTMFhUXS8+UUq5XtNFjkKqyMWTR16y2V-AJB8Hgg4MSDB0Km+GZz5yxNzRANlB3ctb2VDOXdeo5AA */
  context: {
    isOn: true,
  },
  initial: "GREEN",
  states: {
    GREEN: {
      on: {
        CHANGE: "YELLOW",
      },
    },
    YELLOW: {
      on: {
        CHANGE: "RED",
      },
    },
    RED: {
      on: {
        CHANGE: "GREEN",
      },
    },
  },
  on: {
    CHANGE: {},
    TURN_OFF: {
      actions: assign({
        isOn: false,
      }),
    },
    TURN_ON: {
      actions: assign({
        isOn: true,
      }),
    },
    TOGGLE_ON_OFF: {
      actions: assign({
        isOn: ({ context }) => !context.isOn,
      }),
    },
  },
});

export const trafficLightActor = createActor(trafficLightMachine).start();
