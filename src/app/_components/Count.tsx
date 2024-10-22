"use client";

import { useSelector } from "@xstate/react";
import { countActor } from "@stateMachines/countMachine";

export const Count = () => {
  const context = useSelector(countActor, (state) => state.context);

  return (
    <div className="">
      <div className="flex">
        <button
          className="w-16"
          onClick={() => countActor.send({ type: "INC" })}
        >
          +
        </button>
        <button
          className="w-16"
          onClick={() => countActor.send({ type: "DEC" })}
        >
          -
        </button>
        <button
          className="w-16"
          onClick={() => countActor.send({ type: "SET", value: 10 })}
        >
          Set
        </button>
      </div>
      <p>{context.count}</p>
    </div>
  );
};
