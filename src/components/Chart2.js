import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

class Chart2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chart_data: null,
    };
  }

  componentDidMount() {
    console.log(this.options);
    this.getPieChartDetails();
  }

  getPieChartDetails() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      "http://localhost:5000/get_user_graph_based_on_location",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        this.prepareChartData(data);
      });
  }

  prepareChartData(data) {
    this.setState({ chart1_data: data });
  }

  render() {
    const { chart1_data } = this.state;
    console.log(chart1_data);
    if (!chart1_data) {
      return null;
    }
    return (
      <div>
        <Pie data={chart1_data} />
      </div>
    );
  }
}

export default Chart2;
