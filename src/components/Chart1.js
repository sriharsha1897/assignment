import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

class Chart1 extends React.Component {
    options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bar Chart',
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            chart_data: null
        }
    }

    componentDidMount() {
        console.log(this.options);
        this.getBarChartDetails();
    }



    getBarChartDetails() {
        const requestOptions = {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        };
        fetch("http://localhost:5000/get_device_tracking_details", requestOptions)
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
                <h1>{chart1_data.summary}</h1>
                <Bar options={this.options} data={chart1_data} />
            </div>
        );

    }
}

export default Chart1;
