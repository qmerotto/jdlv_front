import { ChannelsNames } from "./Channel.types";
import { EventName } from "./Event.types";

export const getGetEventList = (channelName: ChannelsNames): EventName[] => {
  if (channelName === ChannelsNames.User) {
    return Object.values(EventName);
  }

  return [];
};
