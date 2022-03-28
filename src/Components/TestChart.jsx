import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Chart, LineAdvance } from "bizcharts";

export default function TestChart({ gData }) {
  const [data2, setData2] = useState([
    {
      date: "26/03",
      last_update: "2022-03-27 04:20:47",
      confirmed: 480109649,
      confirmed_diff: 1110305,
      deaths: 6121153,
      deaths_diff: 6982,
      recovered: 0,
      recovered_diff: 0,
      active: 473988496,
      active_diff: 1103323,
      fatality_rate: 0.0127,
    },
    {
      date: "27/03",
      last_update: "2022-03-28 04:20:33",
      confirmed: 480901706,
      confirmed_diff: 792057,
      deaths: 6123447,
      deaths_diff: 2294,
      recovered: 0,
      recovered_diff: 0,
      active: 474778259,
      active_diff: 789763,
      fatality_rate: 0.0127,
    },
    {
      date: "23/03",
      last_update: "2022-03-24 04:20:43",
      confirmed: 475758391,
      confirmed_diff: 1645004,
      deaths: 6104376,
      deaths_diff: 5637,
      recovered: 0,
      recovered_diff: 0,
      active: 469654015,
      active_diff: 1639367,
      fatality_rate: 0.0128,
    },
    {
      date: "25/03",
      last_update: "2022-03-26 04:20:23",
      confirmed: 478999344,
      confirmed_diff: 1660309,
      deaths: 6114171,
      deaths_diff: 4583,
      recovered: 0,
      recovered_diff: 0,
      active: 472885173,
      active_diff: 1655726,
      fatality_rate: 0.0128,
    },
    {
      date: "24/03",
      last_update: "2022-03-25 04:20:46",
      confirmed: 477339035,
      confirmed_diff: 1580644,
      deaths: 6109588,
      deaths_diff: 5212,
      recovered: 0,
      recovered_diff: 0,
      active: 471229447,
      active_diff: 1575432,
      fatality_rate: 0.0128,
    },
    {
      date: "22/03",
      last_update: "2022-03-23 04:20:48",
      confirmed: 474113387,
      confirmed_diff: 1998548,
      deaths: 6098739,
      deaths_diff: 4911,
      recovered: 0,
      recovered_diff: 0,
      active: 468014648,
      active_diff: 1993637,
      fatality_rate: 0.0129,
    },
    {
      date: "17/03",
      last_update: "2022-03-18 04:20:55",
      confirmed: 465925930,
      confirmed_diff: 2034285,
      deaths: 6065260,
      deaths_diff: 6983,
      recovered: 0,
      recovered_diff: 0,
      active: 459860670,
      active_diff: 2027302,
      fatality_rate: 0.013,
    },
    {
      date: "18/03",
      last_update: "2022-03-19 04:20:47",
      confirmed: 468130976,
      confirmed_diff: 2205046,
      deaths: 6070778,
      deaths_diff: 5518,
      recovered: 0,
      recovered_diff: 0,
      active: 462060198,
      active_diff: 2199528,
      fatality_rate: 0.013,
    },
    {
      date: "21/03",
      last_update: "2022-03-22 04:20:54",
      confirmed: 472114839,
      confirmed_diff: 1378376,
      deaths: 6093828,
      deaths_diff: 16297,
      recovered: 0,
      recovered_diff: 0,
      active: 466021011,
      active_diff: 1362079,
      fatality_rate: 0.0129,
    },
    {
      date: "20/03",
      last_update: "2022-03-21 04:20:50",
      confirmed: 470736463,
      confirmed_diff: 1023012,
      deaths: 6077531,
      deaths_diff: 2971,
      recovered: 0,
      recovered_diff: 0,
      active: 464658932,
      active_diff: 1020041,
      fatality_rate: 0.0129,
    },
    {
      date: "19/03",
      last_update: "2022-03-20 04:20:45",
      confirmed: 469713451,
      confirmed_diff: 1582475,
      deaths: 6074560,
      deaths_diff: 3782,
      recovered: 0,
      recovered_diff: 0,
      active: 463638891,
      active_diff: 1578693,
      fatality_rate: 0.0129,
    },
    {
      date: "15/03",
      last_update: "2022-03-16 04:20:50",
      confirmed: 461646986,
      confirmed_diff: 1845793,
      deaths: 6051225,
      deaths_diff: 5405,
      recovered: 0,
      recovered_diff: 0,
      active: 455595761,
      active_diff: 1840388,
      fatality_rate: 0.0131,
    },
    {
      date: "16/03",
      last_update: "2022-03-17 04:20:56",
      confirmed: 463891645,
      confirmed_diff: 2244659,
      deaths: 6058277,
      deaths_diff: 7052,
      recovered: 0,
      recovered_diff: 0,
      active: 457833368,
      active_diff: 2237607,
      fatality_rate: 0.0131,
    },
    {
      date: "14/03",
      last_update: "2022-03-15 04:20:47",
      confirmed: 459801193,
      confirmed_diff: 1852767,
      deaths: 6045820,
      deaths_diff: 1677,
      recovered: 0,
      recovered_diff: 0,
      active: 453755373,
      active_diff: 1851090,
      fatality_rate: 0.0131,
    },
  ]);
  const [data, setData] = useState([
    {
      month: "Jan",
      city: "Tokyo",
      temperature: 7,
    },
    {
      month: "Jan",
      city: "London",
      temperature: 3.9,
    },
    {
      month: "Feb",
      city: "Tokyo",
      temperature: 13,
    },
    {
      month: "Feb",
      city: "London",
      temperature: 4.2,
    },
    {
      month: "Mar",
      city: "Tokyo",
      temperature: 16.5,
    },
    {
      month: "Mar",
      city: "London",
      temperature: 5.7,
    },
    {
      month: "Apr",
      city: "Tokyo",
      temperature: 14.5,
    },
    {
      month: "Apr",
      city: "London",
      temperature: 8.5,
    },
    {
      month: "May",
      city: "Tokyo",
      temperature: 10,
    },
    {
      month: "May",
      city: "London",
      temperature: 11.9,
    },
    {
      month: "Jun",
      city: "Tokyo",
      temperature: 7.5,
    },
    {
      month: "Jun",
      city: "London",
      temperature: 15.2,
    },
    {
      month: "Jul",
      city: "Tokyo",
      temperature: 9.2,
    },
    {
      month: "Jul",
      city: "London",
      temperature: 17,
    },
    {
      month: "Aug",
      city: "Tokyo",
      temperature: 14.5,
    },
    {
      month: "Aug",
      city: "London",
      temperature: 16.6,
    },
    {
      month: "Sep",
      city: "Tokyo",
      temperature: 9.3,
    },
    {
      month: "Sep",
      city: "London",
      temperature: 14.2,
    },
    {
      month: "Oct",
      city: "Tokyo",
      temperature: 8.3,
    },
    {
      month: "Oct",
      city: "London",
      temperature: 10.3,
    },
    {
      month: "Nov",
      city: "Tokyo",
      temperature: 8.9,
    },
    {
      month: "Nov",
      city: "London",
      temperature: 5.6,
    },
    {
      month: "Dec",
      city: "Tokyo",
      temperature: 5.6,
    },
    {
      month: "Dec",
      city: "London",
      temperature: 9.8,
    },
  ]);

  return (
    <>
      <Chart padding={[10, 20, 50, 40]} autoFit height={300} data={data2}>
        <LineAdvance
          shape="smooth"
          point
          area
          position="confirmed*date"
          // position="date*confirmed"
          color="confirmed"
        />
      </Chart>
      <button
        onClick={() =>
          setData((oldData) => [
            ...oldData,
            {
              month: "Dec",
              city: "London",
              temperature: 2.8,
            },
          ])
        }
      >
        Some butt
      </button>
    </>
  );
}
