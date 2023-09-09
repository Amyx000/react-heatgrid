import React, { useRef } from "react";
import { FormatData } from "../utils/FormatData";
import ToolTip from "./ToolTip";
import { CalendarType } from "../types/CalendarType";

function Calendar({
  months = 3,
  gridSize = "15px",
  gap = "2px",
  data,
  dateFormat = "yyyy-mm-dd",
  colors = ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  fontSize = "12px",
  fontColor = "black",
  DisabledToolTip = false,
  DisabledLegend = false,
  placement = "top",
  tooltipBg = "#303030",
  tooltipTextColor = "white",
  tooltipLabel = "activity",
  tooltipStyle,
}: CalendarType) {
  const activityChartRef = useRef<HTMLDivElement>(null);
  const days = ["", "Mon", "", "Wed", "", "Fri"];
  const { newData, monthObject } = FormatData(data, months, dateFormat);
  const cells = newData;
  const maxValue =
    cells.reduce(
      (max, obj) => (obj.value > max ? obj.value : max),
      cells[0].value
    ) || 0;

  const getColor = (value: number) => {
    if (maxValue === 0) {
      return colors[0];
    }
    return colors[Math.ceil((value / maxValue) * (colors.length - 1))];
  };

  return (
    <div
      ref={activityChartRef}
      style={{
        position: "relative",
        padding: "20px",
        fontSize,
        color: fontColor,
        width: "max-content",
      }}
    >
      <div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.ceil(
              cells.length / 7
            )},${gridSize})`,
            gap,
            justifyContent: "end",
            marginBottom: "10px",
          }}
        >
          {new Array(Math.ceil(cells.length / 7)).fill("").map((item, i) => {
            return <div key={i}>{monthObject[i]?.month || ""}</div>;
          })}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateRows: `repeat(7,${gridSize})`,
              gap,
            }}
          >
            {days.map((item, i) => {
              return <div key={i}>{item}</div>;
            })}
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.ceil(
                cells.length / 7
              )},${gridSize})`,
              gridTemplateRows: `repeat(7,${gridSize})`,
              gridAutoFlow: "column",
              gap,
            }}
          >
            {cells.map((obj, i) => {
              return (
                <React.Fragment key={i}>
                  <ToolTip
                    parentRef={activityChartRef}
                    label={`${obj.value} ${tooltipLabel} on ${obj.day}`}
                    DisabledToolTip={DisabledToolTip}
                    placement={placement}
                    tooltipTextColor={tooltipTextColor}
                    tooltipBg={tooltipBg}
                    tooltipStyle={tooltipStyle}
                  >
                    <div
                      style={{
                        backgroundColor: getColor(obj.value),
                        width: gridSize,
                        height: gridSize,
                        borderRadius: "2px",
                        border: "1px solid #e2e8f0",
                      }}
                    />
                  </ToolTip>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {!DisabledLegend && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <div>Less</div>
              <div style={{ display: "flex", gap }}>
                {colors.map((item, i) => {
                  return (
                    <div
                      key={i}
                      style={{
                        backgroundColor: item,
                        width: gridSize,
                        height: gridSize,
                        border: "1px solid #e2e8f0",
                        borderRadius: "2px",
                      }}
                    />
                  );
                })}
              </div>
              <div>More</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Calendar;
