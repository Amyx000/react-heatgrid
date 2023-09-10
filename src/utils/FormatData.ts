function hasValueAndDay(obj: object) {
  return "value" in obj && "day" in obj;
}

export const FormatData = (
  ActivityData: { value: number; day: string }[],
  months: number,
  dateFormat: "yyyy-mm-dd" | "WeekDay, Month Date, Year"
) => {
  if (!Array.isArray(ActivityData)) {
    throw new TypeError("Data must be an array");
  }
  if (!ActivityData.every(hasValueAndDay)) {
    throw new TypeError("Data must have value and day field in array");
  }
  const newData = [...ActivityData];
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setMonth(startDate.getMonth() - months);

  const dayOfWeek = startDate.getDay();
  startDate.setDate(startDate.getDate() - dayOfWeek);

  const currentDate = new Date(startDate);

  // Define the type of monthCounts using an index signature
  const monthCounts: Record<string, number> = {}; // Object to store month counts

  for (
    ;
    currentDate <= endDate;
    currentDate.setDate(currentDate.getDate() + 1)
  ) {
    const dateString =
      dateFormat === "yyyy-mm-dd"
        ? currentDate.toISOString().split("T")[0]
        : currentDate.toLocaleString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
            year: "numeric",
          });

    const existingDataIndex = newData.findIndex((item) => {
      if (isNaN(new Date(item.day).getTime())) {
        throw new TypeError("Invalid day, It's is not a type of date");
      }
      const formatedDate =
        dateFormat === "yyyy-mm-dd"
          ? new Date(item.day).toISOString().split("T")[0]
          : new Date(item.day).toLocaleString("en-US", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            });
      return formatedDate === dateString;
    });

    if (existingDataIndex === -1) {
      newData.push({ day: dateString, value: 0 });
    } else {
      const { day, value } = newData[existingDataIndex];
      newData[existingDataIndex] = {
        day:
          dateFormat === "yyyy-mm-dd"
            ? new Date(day).toISOString().split("T")[0]
            : new Date(day).toLocaleString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
        value,
      };
    }

    // Get the short month name from the current date
    const shortMonth = currentDate.toLocaleDateString("en-US", {
      month: "short",
    });

    // Increment the count for the month in the monthCounts object
    if (monthCounts[shortMonth]) {
      monthCounts[shortMonth]++;
    } else {
      monthCounts[shortMonth] = 1;
    }
  }

  newData.sort((a, b) =>
    new Date(a.day).getTime() > new Date(b.day).getTime() ? 1 : -1
  );

  // Create an array of objects for month counts with index field
  let monthCountArray: { month: string; count: number; index: number }[] = [];
  for (const shortMonth in monthCounts) {
    const monthCount = {
      month: shortMonth,
      count: monthCounts[shortMonth],
      index: Math.ceil(
        newData.findIndex(
          (obj) =>
            new Date(obj.day).toLocaleDateString("en-US", {
              month: "short",
            }) === shortMonth
        ) / 7
      ),
    };

    monthCountArray.push(monthCount);
  }
  monthCountArray.sort((a, b) => b.count - a.count);
  monthCountArray = monthCountArray
    .slice(0, months)
    .sort((a, b) => (a.month > b.month ? -1 : 1));

  const monthObject: Record<string, { month: string }> = {};

  monthCountArray.forEach((item, index) => {
    if (index === 0) {
      monthObject[index] = { month: item.month };
    } else {
      monthObject[item.index] = { month: item.month };
    }
  });

  return {
    newData,
    monthObject,
  };
};
