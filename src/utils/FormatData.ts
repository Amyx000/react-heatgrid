export const FormatData = (
  ActivityData: { value: number; day: string }[],
  months: number
) => {
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
    const dateString = currentDate.toISOString().split("T")[0];
    const existingData = newData.find((item) => item.day === dateString);

    if (!existingData) {
      newData.push({ day: dateString, value: 0 });
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

  newData.sort((a, b) => (a.day > b.day ? 1 : -1));

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
