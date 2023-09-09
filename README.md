# React HeatGrid

React HeatGrid is a versatile and customizable heatmap component for React applications.

![HeatGrid Demo](link_to_demo_image.png)

## Installation

You can install React HeatGrid via npm or yarn:

```bash
npm i react-heatgrid --save
```

## Usage

To use the `Calendar` component from the `react-heatgrid` package, you need to import it and pass the required props. Below is an example of how to use the `Calendar` component along with an explanation of its props:

```jsx
import React from 'react';
import { Calendar } from 'react-heatgrid';

const MyCalendar = () => {
  const calendarData = [
    { value: 10, day: '2023-09-01' },
    // Add more data entries for each day
  ];

  const heatmapColors = [
    '#FFFFFF',
    '#FFD700',
    '#FFA500',
    // Add more colors for your heatmap
  ];

  return (
    <div>
      <h1>My Calendar Heatmap</h1>
      <Calendar
        months={12}                 {/* Number of months to display */}
        data={calendarData}         {/* Array of data objects */}
        colors={heatmapColors}      {/* Array of heatmap colors */}
        tooltipLabel="activity"     {/* Tooltip label */}
      />
    </div>
  );
};

export default MyCalendar;

```

## Props Guide

| Prop               | Description                                                                                                                             | Default Value |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `months`           | The number of months to display in the calendar.                                                                                        | 12            |
| `gridSize`         | The size of each grid cell in the calendar.                                                                                             | "20px"        |
| `gap`              | The gap between grid cells in the calendar.                                                                                             | "2px"         |
| `data`             | An array of data objects representing each day in the calendar. Each object should have a 'value' (number) and 'day' (string) property. | Required      |
| `colors`           | An array of colors from low intensity to high. e.g ["#161b22","#0e4429","#006d32","#26a641","#39d353"]                                  | Required      |
| `fontSize`         | Size of text throughout the calendar.                                                                                                   | "12px"        |
| `DisabledToolTip`  | Disable tooltips for grid cells.                                                                                                        | false         |
| `placement`        | The placement of tooltips relative to the grid cell ("top" or "bottom").                                                                | "top"         |
| `tooltipBg`        | The background color of tooltips.                                                                                                       | "#303030"     |
| `tooltipTextColor` | The text color of tooltips.                                                                                                             | "white"       |
| `tooltipLabel`     | The label for the tooltip, which can be one of "activity", "contributions", or a custom string.                                         | "activity"    |
| `tooltipStyle`     | Additional CSS styles to apply to the tooltip. e.g {border:"1px solid red"}                                                             | None          |
