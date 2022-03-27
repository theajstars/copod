//Page for showing Realtime COVID Statistics
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { Container } from "@mui/material";
const { Option } = Select;
import Globe from "../Assets/IMG/world-globe.png";
import TestChart from "./TestChart";

function handleRegionChange(optionValue) {
  console.log("Value changed to: ", optionValue);
}
function handleDataChange(optionValue) {
  console.log("Value changed to: ", optionValue);
}
const globePrefix = <img src={Globe} className="country-select-image" />;

export default function CovidStatistics() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("everywhere");
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    console.log("The graph data: ", graphData);
  }, [graphData]);
  function handleTimeSpanChange(optionValue) {
    // console.log("Value changed to: ", optionValue);
    switch (optionValue) {
      case "two-weeks":
        var today = new Date();
        //Get array of all dates two weeks before current date
        const previousDates = [];
        for (var i = 1; i < 15; i++) {
          var priorDate = new Date(new Date().setDate(today.getDate() - i));
          var year = priorDate.getFullYear();
          var month = priorDate.getMonth() + 1;
          var date = priorDate.getDate();
          const thisDateString = `${year}-${
            month < 10 ? `0${month}` : `${month}`
          }-${date < 10 ? `0${date}` : `${date}`}`;
          console.log(thisDateString);
          previousDates.push(thisDateString);
        }
        //Get report for everyday of the last two weeks
        previousDates.map((thatDate) => {
          var options = {};
          if (region === "everywhere") {
            options = {
              method: "GET",
              url: "https://covid-19-statistics.p.rapidapi.com/reports/total",
              params: {
                date: thatDate,
              },
              headers: {
                "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
                "X-RapidAPI-Key":
                  "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
              },
            };
          } else {
            options = {
              method: "GET",
              url: "https://covid-19-statistics.p.rapidapi.com/reports",
              params: {
                region_name: region,
                date: thatDate,
              },
              headers: {
                "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
                "X-RapidAPI-Key":
                  "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
              },
            };
          }
          axios.request(options).then((response) => {
            const dateData = response.data.data;
            console.log(dateData);
            //Push data into graph array for plotting
            setGraphData((oldData) => [...oldData, dateData]);
          });
        });
        break;
      default:
        console.log("Default value");
    }
  }
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate() - 1;
  const currentDateString = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    date < 10 ? `0${date}` : `${date}`
  }`;
  // Set the default timespan to the currentDateString
  const [timespan, setTimespan] = useState(currentDateString);
  const [dataType, setDataType] = useState("");
  const [activeCases, setActiveCases] = useState(0);
  const [newCases, setNewCases] = useState(0);
  const [deaths, setDeaths] = useState(0);

  useEffect(() => {
    document.title = "COPOD - COVID Tracker";
    console.log("The current Date:", timespan);
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json`
      )
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  useEffect(() => {
    //Make request when parameters change
    //If region is set to everywhere
    var options = {};
    if (region === "everywhere") {
      options = {
        method: "GET",
        url: "https://covid-19-statistics.p.rapidapi.com/reports/total",
        params: {
          date: timespan,
        },
        headers: {
          "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
          "X-RapidAPI-Key":
            "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
        },
      };
    } else {
      //Region is set to a particular country
      options = {
        method: "GET",
        url: "https://covid-19-statistics.p.rapidapi.com/reports/",
        params: {
          region_name: region,
          date: timespan,
        },
        headers: {
          "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
          "X-RapidAPI-Key":
            "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
        },
      };
    }

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        const data = response.data.data;
        setActiveCases(data.active);
        setNewCases(data.active_diff);
        setDeaths(data.deaths);
      })
      .catch((err) => {
        console.error(err);
      });
    axios.get();
  }, [region, timespan]);
  return (
    <>
      <Container maxWidth="md">
        <div className="statistics-container flex-column">
          <div className="flex-row stats-row">
            <div className="stat-item">
              <div className="stat-figure">{activeCases.toLocaleString()}</div>
              <small className="stat-name">Active Cases</small>
            </div>
            <div className="stat-item">
              <div className="stat-figure">{newCases.toLocaleString()}</div>
              <small className="stat-name">New Cases</small>
            </div>
            <div className="stat-item">
              <div className="stat-figure">{deaths.toLocaleString()}</div>
              <small className="stat-name">Total Deaths</small>
            </div>
          </div>
          <div className="flex-row statistics-select">
            <Select
              defaultValue="new-cases"
              style={{ width: 140 }}
              onChange={handleDataChange}
            >
              <Option value="total-cases">Total Cases</Option>
              <Option value="new-cases">New Cases</Option>
              <Option value="deaths">Deaths</Option>
            </Select>

            <Select
              defaultValue="everywhere"
              style={{ width: 250 }}
              onChange={handleRegionChange}
            >
              <Option value="everywhere">{globePrefix} Everywhere</Option>
              {countries.map((country, countryIndex) => {
                const countryPrefix = (
                  <img src={country.image} className="country-select-image" />
                );
                return (
                  <Option value={country.code} key={`meow${countryIndex}`}>
                    {countryPrefix}
                    {country.name}
                  </Option>
                );
              })}
            </Select>

            <Select
              defaultValue="all-time"
              style={{ width: 140 }}
              onChange={handleTimeSpanChange}
            >
              <Option value="all-time">All Time</Option>
              <Option value="last-30-days">Last 30 Days</Option>
              <Option value="two-weeks">Last 2 Weeks</Option>
              <Option value="today">Today</Option>
            </Select>
          </div>
        </div>
        <TestChart />
      </Container>
    </>
  );
}
