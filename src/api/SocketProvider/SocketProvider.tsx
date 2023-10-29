import React, { useEffect, FunctionComponent } from "react";
import { Socket } from "phoenix";

import { ISocketProvider } from "./Socket.types";
import { SocketContextProvider } from "./SocketContext";

export const SocketProvider: FunctionComponent<ISocketProvider> = ({
  websocketUrl,
  jwt,
  children: childrenProp,
}) => {
  const websocket =
    websocketUrl && jwt && new Socket(websocketUrl, { params: { jwt } });

  useEffect(() => {
    if (!websocket) return;

    websocket.connect();

    return (): void => {
      websocket.disconnect();
    };
  }, [websocketUrl, jwt]);

  const children = React.Children.map(childrenProp, (child) => {
    if (!React.isValidElement(child)) {
      return child;
    }
    return React.cloneElement(child, { ...child.props });
  });

  return (
    <SocketContextProvider value={websocket || null}>
      {children}
    </SocketContextProvider>
  );
};
