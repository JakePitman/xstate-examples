import { createMachine, assign, createActor } from "xstate";

export const countMachine = createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAYgEkA5AYQG0AGAXUVAAcB7WXAF1zf2ZAAPRACYArAHYAdAGYAbABZJADhEKAjCIljlAGhABPRJvVS6OsQE4RMy8roy66ywF8X+tFjyFSAEQCitIwC7Jw8fALCCMqWUjoSygl0WupiYg76RggAtCKmecrqdMoaefLWym4eGDgExCQAyv4AKvRMSCCh3Lz8HVHZlrEyynIS6o7KYsMWmYjZYnJSqupyNnJyznLWbu4g+GwQcAKetT4hHN0RfcYSswiOMlLOU8ViNuIirjtAA */
  context: {
    count: 0,
  },
  on: {
    INC: {
      actions: assign({
        count: ({ context }) => context.count + 1,
      }),
    },
    DEC: {
      actions: assign({
        count: ({ context }) =>
          context.count > 0 ? context.count - 1 : context.count,
      }),
    },
    SET: {
      actions: assign({
        count: ({ event }) => event.value,
      }),
    },
  },
});

export const countActor = createActor(countMachine).start();

countActor.subscribe((state) => {
  console.log(state.context.count);
});
