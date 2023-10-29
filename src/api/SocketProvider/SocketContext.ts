import { Socket } from "phoenix";
import * as React from "react";

export const SocketContext = React.createContext<Socket | null>(null);

export const SocketContextProvider = SocketContext.Provider;
