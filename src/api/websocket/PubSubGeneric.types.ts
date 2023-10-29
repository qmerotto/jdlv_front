import { EventName, TEvent } from "./Event.types";

export enum EPubSubType {
  Publish = "publish",
  Subscribe = "subscribe",
  UnSubscribe = "unsubscribe",
}

export interface IPubSubGenericProvider {
  context: React.Context<TPubSub | null>;
  channelName: string;
  events: EventName[];
  currentUser?: ICurrentUser;
  children: React.ReactNode;
  canConnect: boolean;
}

export interface ICurrentUser {
  uuid: string;
}

export interface TPubSub {
  publish: (arg0: EventName, arg1: TEvent) => void;
  subscribe: (
    channel: EventName,
    handler: (arg0: TEvent) => void
  ) => (() => void) | void;
  unsubscribe: (arg0: EventName, arg1: (arg0: TEvent) => void) => void;
  push:
    | ((eventName: string, payload: Record<string, unknown>) => void)
    | undefined;
}

export type TPubSubAction =
  | { type: EPubSubType.Publish; event: EventName; payload: TEvent }
  | {
      type: EPubSubType.Subscribe;
      event: EventName;
      handler: (arg0: TEvent) => void;
    }
  | {
      type: EPubSubType.UnSubscribe;
      event: EventName;
      handler: (arg0: TEvent) => void;
    };

export type TPubSubEvents = {
  [key in EventName]: ((arg0: TEvent) => void)[];
};

export interface TPubSubState {
  eventsCallbacks: TPubSubEvents;
}
