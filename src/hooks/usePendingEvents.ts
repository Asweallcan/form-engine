import { useRef } from "react";

import { useRefCallback } from "./useRefCallback";

export const usePendingEvents = () => {
  const pendingEvents = useRef<
    Array<{
      key: string;
      promise: Promise<void>;
      canceled: boolean;
      resolve(): void;
    }>
  >([]);

  const wait = useRefCallback(async (promise: Promise<void>) => {
    if (pendingEvents.current[0].promise === promise) return;

    await Promise.all(
      pendingEvents.current.slice(
        0,
        pendingEvents.current.findIndex((event) => event.promise === promise)
      )
    );
  });

  const addPendingEvent = useRefCallback((key: string) => {
    // cancel prev all same event
    for (let i = 0; i < pendingEvents.current.length; i++) {
      const event = pendingEvents.current[i];

      if (event.key === key) {
        event.resolve();
        event.canceled = true;
      }
    }

    let resolve = () => {};
    const promise = new Promise<void>((r) => {
      resolve = () => {
        r();

        pendingEvents.current.splice(
          pendingEvents.current.findIndex((event) => event.promise === promise),
          1
        );
      };
    });

    const event = { key, promise, resolve, canceled: false };

    pendingEvents.current.push(event);

    return event;
  });

  return {
    wait,
    addPendingEvent,
  };
};
