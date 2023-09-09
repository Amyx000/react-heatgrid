import { CSSProperties } from "react";

export type CalendarType = {
  months?: number;
  gridSize?: string;
  gap?: string;
  data: { value: number; day: string }[];
  colors: string[];
  fontSize: string;
  fontColor: string;
  DisabledToolTip?: boolean;
  DisabledLegend?: boolean;
  placement?: "top" | "bottom";
  tooltipBg?: string;
  tooltipTextColor?: string;
  tooltipLabel: "activity" | "contributions" | string;
  tooltipStyle?: CSSProperties;
};
