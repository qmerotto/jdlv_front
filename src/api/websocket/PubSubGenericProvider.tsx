import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { SocketContext } from "../SocketProvider/SocketContext";

import { EventName, TEvent } from "./Event.types";
import {
  EPubSubType,
  IPubSubGenericProvider,
  TPubSub,
  TPubSubEvents,
} from "./PubSubGeneric.types";
import { pubSubReducer } from "./PubSubGenericReducer";

export const PubSubGenericProvider: FunctionComponent<
  IPubSubGenericProvider
> = ({
  context,
  currentUser,
  channelName,
  events,
  children: childrenProp,
  canConnect,
}) => {
  const websocket = useContext(SocketContext);

  const eventsCallbacks = useMemo(
    () =>
      Object.values(events).reduce(
        (events: TPubSubEvents, eventName: EventName): TPubSubEvents => {
          events[eventName] = new Array<(arg0: TEvent) => void>();
          return events;
        },
        {} as TPubSubEvents
      ),
    [events]
  );

  const [, dispatch] = useReducer(pubSubReducer, {
    eventsCallbacks,
  });

  const unsubscribe = (
    event: EventName,
    handler: (arg0: TEvent) => void
  ): (() => void) | void => {
    dispatch({ type: EPubSubType.UnSubscribe, event, handler });
  };

  const subscribe = (
    event: EventName,
    handler: (arg0: TEvent) => void
  ): (() => void) | void => {
    dispatch({ type: EPubSubType.Subscribe, event, handler });
    return (): (() => void) | void => unsubscribe(event, handler);
  };

  const publish = (event: EventName, payload: TEvent): (() => void) | void => {
    dispatch({ type: EPubSubType.Publish, event, payload });
  };

  const [push, setPush] =
    useState<(eventName: string, payload: Record<string, unknown>) => void>();

  useEffect(() => {
    if (!websocket || !canConnect) return;

    const channel = websocket.channel(channelName, { client: "browser" });

    channel.onMessage = (event: EventName, payload: TEvent): TEvent => {
      if (event !== null) {
        publish(event, {
          id: payload?.id,
          sentAt: new Date(payload.sentAt),
          payload: payload?.payload,
        } as TEvent);
      }

      return payload as TEvent;
    };

    channel
      .join()
      .receive("ok", (e) => {
        console.info("successfully joined channel", e.messages || "");

        // Delay notifications publish
        setTimeout(() => {
          if (e.length > 0) {
            for (let i = 0; i < e.length && i < 35; i++) {
              publish(e[i].event, {
                id: e[i]?.id,
                sentAt: e[i]?.sentAt,
                payload: e[i]?.payload,
              } as TEvent);
            }
          }
        }, 1000);
      })
      .receive("error", ({ reason }) =>
        console.error("failed to join channel", reason)
      );

    setPush(
      () => (eventName: string, payload: object) =>
        channel.push(eventName, payload)
    );
  }, [currentUser?.uuid]);

  const pubsub: TPubSub = useMemo(() => {
    return { subscribe, unsubscribe, publish, push };
  }, [push]);

  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }

    return React.cloneElement(child, { ...child.props });
  });

  if (!canConnect) {
    return <>{children}</>;
  }

  return <context.Provider value={pubsub}>{children}</context.Provider>;
};
