//Page for showing Realtime COVID Statistics
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { Container } from "@mui/material";
const { Option } = Select;
import Globe from "../Assets/IMG/world-globe.png";
import TestChart from "./TestChart";
import { Chart, LineAdvance } from "bizcharts";

function getRealDate(date) {
  var d = new Date(date);
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  var date = d.getDate();
  date = date < 10 ? `0${date}` : date;
  return `${year}-${month}-${date}`;
}
function handleDataChange(optionValue) {
  console.log("Value changed to: ", optionValue);
}
const globePrefix = <img src={Globe} className="country-select-image" />;

export default function CovidStatistics() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("everywhere");
  const [graphData, setGraphData] = useState([]);
  const [graphAxis, setGraphAxis] = useState("");

  const [dataType, setDataType] = useState("new-cases");
  const [activeCases, setActiveCases] = useState(0);
  const [newCases, setNewCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  var date = d.getDate() - 1;
  const currentDateString = `${year}-${month < 10 ? `0${month}` : `${month}`}-${
    date < 10 ? `0${date}` : `${date}`
  }`;
  // Set the default timespan to the currentDateString
  const [timespan, setTimespan] = useState(currentDateString);
  useEffect(() => {
    console.log("The graph data: ", graphData);
  }, [graphData]);
  function handleTimeSpanChange(optionValue) {
    console.log(optionValue);
    setTimespan(optionValue);
  }
  function handleRegionChange(optionValue) {
    console.log("Value changed to: ", optionValue);
    setRegion(optionValue);
  }

  useEffect(() => {
    //Get countries and flags on page load
    document.title = "COPOD - COVID Tracker";
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json`
      )
      .then((res) => {
        setCountries(res.data);
      });
  }, []);

  function updateGraph() {
    switch (timespan) {
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
            var d = new Date(dateData.date);
            var date = d.getDate();
            var month = d.getMonth() + 1;
            dateData.date = `${date}/${month < 10 ? `0${month}` : month}`;
            dateData.abbrVal = Math.floor(dateData.confirmed / 1000000);
            //Push data into graph array for plotting
            setGraphData((oldData) => [...oldData, dateData]);
          });
          setGraphData(
            graphData.sort(function (a, b) {
              return new Date(b.last_update) - new Date(a.last_update);
            })
          );
        });
        console.log(graphData);
        var y = "";
        switch (dataType) {
          case "new-cases":
            y = "confirmed_diff";
            break;
          case "deaths":
            y = "deaths";
            break;
          case "total-cases":
            y = "confirmed";
        }
        setGraphAxis(`date*${y}`);
        break;
      default:
        console.log("Default value");
    }
  }
  function updateStatistics() {
    var today = new Date(new Date().setDate(new Date().getDate() - 1));

    const todayDateString = getRealDate(today);

    //Modify date string based on timespan
    if (region === "everywhere") {
      if (timespan === "this-day") {
        //Make one API request
      } else {
        switch (timespan) {
          case "this-day":
            console.clear();
            console.log(todayDateString);
            var todayOptions = {
              method: "GET",
              url: "https://covid-19-statistics.p.rapidapi.com/reports/total",
              params: {
                date: todayDateString,
              },
              headers: {
                "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
                "X-RapidAPI-Key":
                  "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
              },
            };
            axios.request(todayOptions).then((res) => {
              console.log(res);
              setDeaths(res.data.data.deaths);
              setActiveCases(res.data.data.active);
              setNewCases(res.data.data.active_diff);
            });
            break;
          case "two-weeks":
            var todayStats = {};
            var twoWeeksStats = {};
            //Make two requests for today and date two weeks ago
            const twoWeeksAgo = getRealDate(
              new Date(new Date().setDate(new Date().getDate() - 14))
            );
            var todayOptions = {
              method: "GET",
              url: "https://covid-19-statistics.p.rapidapi.com/reports/total",
              params: {
                date: todayDateString,
              },
              headers: {
                "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
                "X-RapidAPI-Key":
                  "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
              },
            };
            var twoWeeksOptions = {
              method: "GET",
              url: "https://covid-19-statistics.p.rapidapi.com/reports/total",
              params: {
                date: twoWeeksAgo,
              },
              headers: {
                "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
                "X-RapidAPI-Key":
                  "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
              },
            };
            //Get today Statistics
            axios.request(todayOptions).then((res) => {
              todayStats = res.data.data;
              console.log(todayStats);
            });
            axios.request(twoWeeksOptions).then((res) => {
              twoWeeksStats = res.data.data;
              // console.clear();
              console.log(todayStats);
              console.log(twoWeeksStats);
              console.log(twoWeeksAgo);
              //Update statistics Parameters
              setTimeout(() => {
                setDeaths(todayStats.deaths - twoWeeksStats.deaths);
                setActiveCases(twoWeeksStats.active);
                setNewCases(todayStats.active - twoWeeksStats.active);
              }, 1500);
            });
            break;
          case "last-30-days":
            var todayStats = {};
            var days30Stats = {};
            //Make two requests for today and date two weeks ago
            const days30Ago = getRealDate(
              new Date(new Date().setDate(new Date().getDate() - 30))
            );
            var todayOptions = {
              method: "GET",
              url: "https://covid-19-statistics.p.rapidapi.com/reports/total",
              params: {
                date: todayDateString,
              },
              headers: {
                "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
                "X-RapidAPI-Key":
                  "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
              },
            };
            var days30Options = {
              method: "GET",
              url: "https://covid-19-statistics.p.rapidapi.com/reports/total",
              params: {
                date: days30Ago,
              },
              headers: {
                "X-RapidAPI-Host": "covid-19-statistics.p.rapidapi.com",
                "X-RapidAPI-Key":
                  "c25b202a81msh193143b5a7aefe3p11a9a3jsn7785bbb7b0fd",
              },
            };
            console.log(days30Ago);
            //Get today Statistics
            axios.request(todayOptions).then((res) => {
              todayStats = res.data.data;
              console.log(todayStats);
            });
            axios.request(days30Options).then((res) => {
              days30Stats = res.data.data;
              console.log(days30Stats);
              // console.clear();
              //Update statistics Parameters
              setTimeout(() => {
                console.log("Perfomed some action");
                setDeaths(todayStats.deaths - days30Stats.deaths);
                setActiveCases(days30Stats.active);
                setNewCases(todayStats.active - days30Stats.active);
              }, 1500);
            });
            break;
        }
      }
    } else {
      //Region is set to a particular country
      var options = {
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
  }
  useEffect(() => {
    //Make request when parameters change for top-level statistics
    //If region is set to everywhere
    updateStatistics();
    console.log(timespan);
  }, [region, timespan]);

  // useEffect(() => {
  //   // Update graph data when region, timespan and data type change
  //   // if region is set to everywhere
  //   updateGraph();
  // }, [dataType, region, timespan]);
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
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children[1].toLowerCase().indexOf(input.toLowerCase()) >=
                0
              }
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
              defaultValue="this-day"
              style={{ width: 140 }}
              onChange={handleTimeSpanChange}
            >
              <Option value="this-day">Today</Option>
              <Option value="last-30-days">Last 30 Days</Option>
              <Option value="two-weeks">Last 2 Weeks</Option>
            </Select>
          </div>
        </div>
        {/* <TestChart /> */}
        {/* <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={graphData}>
          <LineAdvance
            shape="smooth"
            point
            area
            position="date*abbrVal"
            color="orange"
          />
        </Chart> */}
        <center>
          <i>
            <small className="chart-tip">Figures in million</small>
          </i>
        </center>
      </Container>
    </>
  );
}
