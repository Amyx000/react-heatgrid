import React, { useRef, useState } from "react";
import { ToolTipType } from "../types/ToolTipType";

function ToolTip({
  children,
  label,
  DisabledToolTip,
  placement,
  tooltipBg,
  tooltipTextColor,
  tooltipStyle,
  parentRef,
}: ToolTipType) {
  const tipRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{
    left: number | string;
    right: number | string;
    opacity: number;
  }>({ left: "unset", right: "unset", opacity: 0 });
  const onHover = () => {
    if (tipRef.current && elementRef.current && parentRef.current) {
      const parentRect = parentRef.current.getBoundingClientRect();
      const eleRef = elementRef.current.getBoundingClientRect();
      const offset =
        Math.abs(tipRef.current.offsetWidth - elementRef.current.offsetWidth) /
        2;
      const leftSpace = Math.abs(eleRef.left - parentRect.left);
      const rightSpace = Math.abs(parentRect.right - eleRef.right);
      let position: {
        left: number | string;
        right: number | string;
        opacity: number;
      } = { left: "unset", right: "unset", opacity: 0 };
      if (leftSpace > offset && rightSpace > offset) {
        position = {
          left: -offset,
          right: "unset",
          opacity: 1,
        };
      } else {
        position = {
          ...(leftSpace > rightSpace
            ? { right: -rightSpace, left: "unset", opacity: 1 }
            : { left: -leftSpace, right: "unset", opacity: 1 }),
        };
      }
      setPosition((prev) => ({ ...prev, ...position }));
    }
  };

  return (
    <div
      ref={elementRef}
      style={{ position: "relative" }}
      onMouseEnter={onHover}
      onMouseLeave={() => setPosition((prev) => ({ ...prev, opacity: 0 }))}
    >
      {children}
      <div
        ref={tipRef}
        style={{
          position: "absolute",
          display: DisabledToolTip ? "none" : "block",
          ...(placement === "bottom"
            ? { top: "100%", marginTop: "4px" }
            : { bottom: "100%", marginBottom: "4px" }),
          width: "max-content",
          padding: "2px 8px",
          borderRadius: "4px",
          backgroundColor: tooltipBg,
          color: tooltipTextColor,
          pointerEvents: "none",
          transition: "all 0.2s ease-in",
          zIndex: 1000,
          ...position,
          ...tooltipStyle,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default ToolTip;
