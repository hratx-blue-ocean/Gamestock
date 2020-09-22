import React from "react";
import Chart from "chart.js";
import { Line } from "react-chartjs-2";

const PriceGraph = ({ dates, prices }) => {
  if (dates && prices) {
    return (
      <div
        style={{
          width: "80%",
        }}
      >
        <Line
          data={{
            labels: dates,
            datasets: [
              {
                label: `Price`,
                fill: false,
                lineTension: 0,
                backgroundColor: "#EB29FD",
                borderColor: "#54F3F7",
                borderWidth: 2,
                data: prices,
              },
            ],
          }}
          gridLines={{
            display: false,
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scaleLabel: function (label) {
              const price = label.value
                .toFixed(2)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return `$`;
            },
            scales: {
              xAxes: [
                {
                  gridLines: { color: "#EB29FD" },
                  ticks: { fontColor: "#54F3F7" },
                },
              ],
              yAxes: [
                {
                  gridLines: { color: "#EB29FD" },
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return (
                        "$" +
                        value
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      );
                    },
                    fontColor: "#54F3F7",
                  },
                },
              ],
              ticks: { fontColor: "#54F3F7" },
            },
            legend: {
              labels: {
                fontColor: "#EB29FD",
              },
            },
          }}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default PriceGraph;
