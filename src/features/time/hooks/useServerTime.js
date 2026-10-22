import { useContext } from "react";
import { ServerTimeContext } from "../context/ServerTimeContext";

export function useServerTime() {
  const context = useContext(ServerTimeContext);
  if (!context) throw new Error("useServerTime must be used inside ServerTimeProvider");
  return context;
}