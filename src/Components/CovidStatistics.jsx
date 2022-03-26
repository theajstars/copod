//Page for showing Realtime COVID Statistics
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { Container } from "@mui/material";
const { Option } = Select;
import Globe from "../Assets/IMG/world-globe.png";
import TestChart from "./TestChart";

function handleChange(optionValue) {
  console.log("Value changed to: ", optionValue);
}
const globePrefix = <img src={Globe} className="country-select-image" />;

export default function CovidStatistics() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("everywhere");
  const [timespan, setTimespan] = useState("");
  const [dataType, setDataType] = useState("");

  useEffect(() => {
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
          // date: timespan,
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
      })
      .catch((err) => {
        console.error(err);
      });
    axios.get();
  }, [region, timespan, dataType]);
  return (
    <>
      <Container maxWidth="md">
        <div className="statistics-container flex-column">
          <div className="flex-row stats-row">
            <div className="stat-item">
              <div className="stat-figure">45,000</div>
              <small className="stat-name">Active Cases</small>
            </div>
            <div className="stat-item">
              <div className="stat-figure">45,000</div>
              <small className="stat-name">New Cases</small>
            </div>
            <div className="stat-item">
              <div className="stat-figure">45,000</div>
              <small className="stat-name">Total Deaths</small>
            </div>
          </div>
          <div className="flex-row statistics-select">
            <Select
              defaultValue="new-cases"
              style={{ width: 140 }}
              onChange={handleChange}
            >
              <Option value="total-cases">Total Cases</Option>
              <Option value="new-cases">New Cases</Option>
              <Option value="deaths">Deaths</Option>
            </Select>

            <Select
              defaultValue="everywhere"
              style={{ width: 250 }}
              onChange={handleChange}
            >
              <Option value="everywhere">{globePrefix} Everywhere</Option>
              {countries.map((country) => {
                const countryPrefix = (
                  <img src={country.image} className="country-select-image" />
                );
                return (
                  <Option value={country.code}>
                    {countryPrefix}
                    {country.name}
                  </Option>
                );
              })}
            </Select>

            <Select
              defaultValue="all-time"
              style={{ width: 140 }}
              onChange={handleChange}
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
