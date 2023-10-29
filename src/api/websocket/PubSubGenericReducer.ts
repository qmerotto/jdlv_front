import {
  EPubSubType,
  TPubSubAction,
  TPubSubState,
} from "./PubSubGeneric.types";

export const pubSubReducer = (
  state: TPubSubState,
  action: TPubSubAction
): TPubSubState => {
  const current = { ...state };

  switch (action.type) {
    case EPubSubType.Subscribe: {
      current.eventsCallbacks = { ...state.eventsCallbacks };

      const handlers = current.eventsCallbacks[action.event] || [];

      handlers.push(action.handler);

      current.eventsCallbacks[action.event] = handlers;

      return current;
    }

    case EPubSubType.UnSubscribe: {
      const unsubHandlers = current.eventsCallbacks[action.event] || [];

      const i = unsubHandlers.indexOf(action.handler);

      if (i > -1) unsubHandlers.splice(i, 1);

      current.eventsCallbacks[action.event] = unsubHandlers;

      return current;
    }

    case EPubSubType.Publish: {
      const channel = current.eventsCallbacks[action.event] || [];

      for (let i = 0; i < channel.length; i++) {
        channel[i](action.payload);
      }

      return state;
    }

    default:
      return state;
  }
};
