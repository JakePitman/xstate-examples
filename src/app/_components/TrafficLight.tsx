"use client";
import { trafficLightMachine } from "@stateMachines/trafficLightMachine";
import { useMachine } from "@xstate/react";
import cx from "classnames";

export const TrafficLight = () => {
  const [state, send] = useMachine(trafficLightMachine);
  const { context, value } = state;
  const { isOn } = context;

  return (
    <div>
      <div className="flex flex-col">
        <button
          className={cx("w-16 h-16 border rounded-[50%]", {
            "bg-green-500": isOn && value === "green",
          })}
        >
          Green
        </button>
        <button
          className={cx("w-16 h-16 border rounded-[50%]", {
            "bg-yellow-500": isOn && value === "yellow",
          })}
        >
          Yellow
        </button>
        <button
          className={cx("w-16 h-16 border rounded-[50%]", {
            "bg-red-500": isOn && value === "red",
          })}
        >
          Red
        </button>
      </div>

      <button className="p-2" onClick={() => send({ type: "CHANGE" })}>
        Change
      </button>
      <button className="p-2" onClick={() => send({ type: "TURN_OFF" })}>
        Off
      </button>
      <button className="p-2" onClick={() => send({ type: "TURN_ON" })}>
        On
      </button>
      <button className="p-2" onClick={() => send({ type: "TOGGLE_ON_OFF" })}>
        Toggle
      </button>
    </div>
  );
};
