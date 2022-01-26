import React from 'react';
import {
  deviceDetect,
  isDesktop,
  isTablet,
  isMobileOnly,
} from "react-device-detect";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

class UsersDevice extends React.Component {


  constructor(props) {
    super(props);
    this.deviceDetails = {};
    this.ipdetails = {};
    this.state = {
      chart1_data: null,

    }
    // this.deviceDetails = deviceDetect();
    // this.deviceDetails.isDesktop = isDesktop;
    // this.deviceDetails.isTablet = isTablet;
    // this.deviceDetails.isMobileOnly = isMobileOnly;
    // this.deviceDetails.date = new Date().toISOString();

    // this.ipdetails = {
    //   ip: "122.172.74.137",
    //   city: "Bengaluru"
    // }
    // let device_details = { ...this.ipdetails, ...this.deviceDetails };

    // this.sendUserIpDetails(device_details);
    // fetch('https://api.ipdata.co?api-key=a0e80292efbc54945d65f08fc93ef46618e37690991f8a92e4eac1cc')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // this.setState()
    //     this.ipdetails = {
    //       ip: data.ip,
    //       city: data.city
    //     }
    //     let device_details = { ...this.ipdetails, ...this.deviceDetails };

    //     this.sendUserIpDetails(device_details);
    //   });
  }

  componentDidMount() {
    this.deviceDetails = deviceDetect();
    this.deviceDetails.isDesktop = isDesktop;
    this.deviceDetails.isTablet = isTablet;
    this.deviceDetails.isMobileOnly = isMobileOnly;
    this.deviceDetails.date = new Date().toISOString();

    this.ipdetails = {
      ip: "122.172.74.137",
      city: ["Delhi", "Mumbai", "Chennai", "Kolkata"][Math.round(Math.random() * 3)]
    }
    let device_details = { ...this.ipdetails, ...this.deviceDetails };
    this.sendUserIpDetails(device_details);
    // fetch('https://api.ipdata.co?api-key=a0e80292efbc54945d65f08fc93ef46618e37690991f8a92e4eac1cc')
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     // this.setState()
    //     this.ipdetails = {
    //       ip: data.ip,
    //       city: data.city
    //     }
    //     let device_details = { ...this.ipdetails, ...this.deviceDetails };
    //     this.sendUserIpDetails(device_details);
    //   });

    // console.log(this.options);
    // console.log(this.chart1_data);

  }

  sendUserIpDetails(device_details) {
    console.log(device_details);
    this.getUserDetails();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(device_details),
    };
    fetch("http://localhost:5000/fetch_device_details", requestOptions)
      .then((response) => response.json())
      .then((data) => {
      });
  }

  getUserDetails() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };
    fetch("http://localhost:5000/get_user_graph_based_on_date", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        this.prepareUserBasedOnLocation(data);
      });
  }

  prepareUserBasedOnLocation(data) {
    this.setState({
      chart1_data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: data.summary || 'Bar Chart',
          },
        },
      }
    });
  }

  render() {
    const { chart1_data } = this.state;
    console.log(chart1_data);
    if (!chart1_data) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
    return (
      <Line options={chart1_data.options} data={chart1_data} />
    );

  }
}

export default UsersDevice;
