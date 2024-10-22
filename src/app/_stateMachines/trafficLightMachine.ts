import { assign, createActor, createMachine } from "xstate";

type Context = {
  isOn: boolean;
};
export const trafficLightMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgGEAJAQQDkBxAUQG0AGAXUVAAcB7WXAC64e+TiAAeiAEwA2AOwA6AJwAWFnJVyAzDICsWlioCMAGhABPaUsUAOKcaVLdUljvtyAvh7NoseQqQAKgCqAEo0APoA8gBiMawcSCC8-EIiYpIIskYKWs4uKvpGckpacrpmllksUgq6KqoyMloqMkosNlpePhg4BMQkIeHRNAliKYLCokmZsip1cjZGRjYqS0qrlYhG6gpSGtpaxS31RirdIL59AYNRdHQAMgwj0XFjSRNp06CzZQosLGsuichWKRikNi2CHBFyu-mICjooQYDBo5Go9GY7HGfEm6Rm210MgUKhcRPaRzkLBkKhUUPqtS0Nn0SjOwLa5VhvXhRAUAE0GA8HlEAOro2iMd7cXFfDKINQsBRnUGslzKyEWRAM3LMrSswpKDm6Ll+fq85EAEXFmKlyRlUzlCAVStpuiMqpY6qhpJy1lkR2sqikes8F3wPAgcDEcLNONSDoJCAAtKZNQgtC0FDTrCs1oDAU0TdcEUiUTQ43jvhJ5XJvfsFHIpFIVjYNC5DudvJduWb+YLhSKK7LExCtCTdJ0pM5OnrnPTSXV9DoamcgUYizyFJahwmflr6ysm+UyisMzJvQY9k33XIaQYM8avB4gA */
    types: {
      context: {} as Context,
      events: {} as
        | { type: "CHANGE" }
        | { type: "TURN_OFF" }
        | { type: "TURN_ON" }
        | { type: "TOGGLE_ON_OFF" },
      guards: {} as { type: "isOn" },
    },
    context: {
      isOn: true,
    },
    initial: "green",
    states: {
      green: {
        on: {
          // This will stop the transition to yellow when "isOn" guard returns false
          CHANGE: { target: "yellow", guard: "isOn" },
        },
      },
      yellow: {
        on: {
          CHANGE: { target: "red", guard: "isOn" },
        },
      },
      red: {
        on: {
          CHANGE: { target: "green", guard: "isOn" },
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
  },
  {
    guards: {
      isOn: ({ context }: { context: Context }) => context.isOn,
    },
  }
);

export const trafficLightActor = createActor(trafficLightMachine).start();
