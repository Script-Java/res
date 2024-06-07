import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

const SimpleLineChart = (props) => {
  const { x, y } = props.lineData;

  // Log x and y data to verify their content
  console.log("X-axis data:", x);
  console.log("Y-axis data:", y);

  // Ensure x and y are valid arrays of numbers
  const isValidData =
    Array.isArray(x) &&
    Array.isArray(y) &&
    x.length === y.length &&
    x.every(
      (item, index) => typeof item === "string" && typeof y[index] === "number"
    );

  if (!isValidData) {
    console.error("Invalid data provided to chart:", { x, y });
    return <div>Error: Invalid data for chart</div>;
  }

  // Convert datetime strings to timestamps
  const xTimestamps = x.map((dateString) => new Date(dateString).getTime());
  const yRating = Array(x.length).fill(45);


  return (
    <div className="">
      <LineChart
        xAxis={[{ data: xTimestamps, label: "Timestamp" }]}
        series={[{ data: y, label: "Load" }, {data: yRating, label: 'rating'}]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default SimpleLineChart;
