//Page for showing Realtime COVID Statistics
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import { Container } from "@mui/material";
const { Option } = Select;
import Globe from "../Assets/IMG/world-globe.png";

function handleChange(optionValue) {
  console.log("Value changed to: ", optionValue);
}
const globePrefix = <img src={Globe} className="country-select-image" />;

export default function CovidStatistics() {
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get(
        `https://cdn.jsdelivr.net/npm/country-flag-emoji-json@2.0.0/dist/index.json`
      )
      .then((res) => {
        console.log(res);
        setCountries(res.data);
      });
  }, []);
  return (
    <>
      <Container maxWidth="md">
        <div className="statistics-container flex-column">
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
            </Select>
          </div>
        </div>
      </Container>
    </>
  );
}
