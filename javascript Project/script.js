document.addEventListener("DOMContentLoaded", function () {
  const numRows = 6; // The number of rows

  // Function to calculate 'Number of Days' and 'Expected DRR' for a given row
  function calculateValues(row) {
    const startDate = new Date(
      document.getElementById(`start-date-${row}`).value
    );
    const endDate = new Date(document.getElementById(`end-date-${row}`).value);
    const numLeads = parseInt(
      document.getElementById(`num-leads-${row}`).value,
      10
    );
    const excludedDatesInput = document.getElementById(`excluded-dates-${row}`);
    const excludedDatesArray = excludedDatesInput.value
      .split(", ")
      .map((date) => new Date(date));

    // Filter out excluded dates from the date range
    const filteredDates = getFilteredDates(
      startDate,
      endDate,
      excludedDatesArray
    );

    // Calculate 'Number of Days'
    const daysDiff = filteredDates.length;
    document.getElementById(`num-days-${row}`).textContent = daysDiff;

    // Calculate 'Expected DRR'
    const expectedDRR = (numLeads * daysDiff) / daysDiff;
    document.getElementById(`expected-drr-${row}`).textContent =
      expectedDRR.toFixed(2); // Format it to 2 decimal places

    // Calculate 'Month' and 'Year'
    const startMonth = startDate.toLocaleString("default", { month: "long" });
    const startYear = startDate.getFullYear();
    document.getElementById(
      `month-year-${row}`
    ).textContent = `${startMonth} ${startYear}`;
  }

  // Function to exclude specific dates for a given row
  function excludeDate(row) {
    const excludedDatesInput = document.getElementById(`excluded-dates-${row}`);
    const excludedDate = new Date(excludedDatesInput.value);
    const excludedDates = excludedDatesInput.value;

    // Handle excluded dates
    if (excludedDates) {
      // Append the excluded date
      excludedDatesInput.value = `${excludedDates}, ${excludedDate.toDateString()}`;
    } else {
      // Set the excluded date
      excludedDatesInput.value = excludedDate.toDateString();
    }

    // Mark the excluded date in the date picker
    const dateInput = document.getElementById(`start-date-${row}`);
    dateInput.value = "";
    dateInput.valueAsDate = excludedDate;

    calculateValues(row);
  }

  // Function to filter out excluded dates from a date range
  function getFilteredDates(startDate, endDate, excludedDates) {
    const filteredDates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      if (
        !excludedDates.some((excludedDate) =>
          isSameDate(currentDate, excludedDate)
        )
      ) {
        filteredDates.push(currentDate);
      }
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return filteredDates;
  }

  // Function to check if two dates have the same day, month, and year
  function isSameDate(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  // Function to perform Ajax data submission
  function submitData() {
    // Replace this with actual Ajax submission logic
    alert("Data submitted via Ajax.");
  }

  // Add event listeners for each row
  for (let i = 1; i <= numRows; i++) {
    const startDateInput = document.getElementById(`start-date-${i}`);
    const endDateInput = document.getElementById(`end-date-${i}`);
    const excludedDatesInput = document.getElementById(`excluded-dates-${i}`);
    const numLeadsInput = document.getElementById(`num-leads-${i}`);
    const saveButton = document.getElementById(`save-button-${i}`);
    const cancelButton = document.getElementById(`cancel-button-${i}`);
    const excludeButton = document.getElementById(`exclude-button-${i}`);

    // Event listeners for inputs
    startDateInput.addEventListener("input", () => calculateValues(i));
    endDateInput.addEventListener("input", () => calculateValues(i));
    excludedDatesInput.addEventListener("input", () => calculateValues(i));
    numLeadsInput.addEventListener("input", () => calculateValues(i));

    // Event listener for excluding dates
    if (excludeButton) {
      excludeButton.addEventListener("click", () => excludeDate(i));
    }

    // Event listener for the "Save" button
    if (saveButton) {
      saveButton.addEventListener("click", submitData);
    }
  }
});
