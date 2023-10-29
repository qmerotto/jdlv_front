import React from "react";
import { TPubSub } from "./PubSubGeneric.types";

export const UserNotificationContext = React.createContext<TPubSub | null>(
  null
);
