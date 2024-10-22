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
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgGEAJAQQDkBxAUQG0AGAXUVAAcB7WXAC64e+TiAAeiAEwA2AOwA6AJwAWFnJVyAzDICsWlioCMAGhABPaUsUAOKcaVLdUljvtyAvh7NoseQqQAKgCqAEo0APoA8gBiMawcSCC8-EIiYpIIskYKWs4uKvpGckpacrpmllksUgq6KqoyMloqMkosNlpePhg4BMQkIeHRNAliKYLCokmZsip1cjZGRjYqS0qrlYhG6gpSGtpaxS31RirdIL59AYNRdHQAMgwj0XFjSRNp06CzZQosLGsuichWKRikNi2CHBFyu-mICjooQYDBo5Go9GY7HGfEm6Rm210MgUKhcRPaRzkLBkKhUUPqtS0Nn0SjOwLa5VhvXhRAUAE0GA8HlEAOro2iMd7cXFfDKINQsBRnUGslzKyEWRAM3LMrSswpKDm6Ll+fq85EAEXFmKlyRlUzlCAVStpuiMqpY6qhpJy1lkR2sqikes8F3wPAgcDEcLNONSDoJCAAtKZNQgtC0FDTrCs1oDAU0TdcEUiUTQ43jvhJ5XJvfsFHIpFIVjYNC5DudvJduWb+YLhSKK7LExCtCTdJ0pM5OnrnPTSXV9DoamcgUYizyFJahwmflr6ysm+UyisMzJvQY9k33XIaQYM8avB4gA */
  context: {
    isOn: true,
  },
  initial: "green",
  states: {
    green: {
      on: {
        CHANGE: "yellow",
      },
    },
    yellow: {
      on: {
        CHANGE: "red",
      },
    },
    red: {
      on: {
        CHANGE: "green",
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
