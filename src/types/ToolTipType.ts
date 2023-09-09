import { CSSProperties } from "react";

export type ToolTipType = {
  children: React.ReactNode;
  label: string;
  DisabledToolTip?: boolean;
  placement?: "top" | "bottom";
  parentRef: React.RefObject<HTMLDivElement>;
  tooltipBg?: string;
  tooltipTextColor?: string;
  tooltipStyle?: CSSProperties;
};
