import React from "react";

export interface ISocketProvider {
  websocketUrl?: string;
  jwt?: string | null;
  children: React.ReactNode;
}
