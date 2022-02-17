import React, { useState, useEffect } from "react";
import { fetchDailyData } from '../../API/index'
import { Line, Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'
import { CategoryScale, LinearScale } from 'chart.js';
import styles from './charts.module.scss'


import {
    ArcElement,
    LineElement,
    PointElement,
    BarController,
    LineController,
    ScatterController,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Filler,
    Legend,
    Title,

} from 'chart.js';

Chart.register(
    ArcElement,
    LineElement,
    PointElement,
    BarController,
    LineController,
    ScatterController,
    CategoryScale,
    LinearScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Filler,
    Legend,
    Title,

);

Chart.register(CategoryScale, LinearScale)




// import styles from './charts.module.scss';
const Charts = ({ data:{confirmed,deaths,recovered}, country }) => {
    console.log(confirmed,deaths,recovered, country)
    const [dailyData, setdailyData] = useState({})
    useEffect(() => {
        const fetchAPI = async () => {
            setdailyData(await fetchDailyData())

        }
        fetchAPI()
    }, [])
    //  console.log(dailyData,"Daily data")

    const lineChart = (
        dailyData[0] ? (
            <Line
                data={{
                    labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
                    datasets: [{
                        data: dailyData.map((data) => data.confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: dailyData.map((data) => data.deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ],
                }}
            />
        ) : null

    )

    // console.log(data.confirmed.value, data.recovered.value, data.deaths.value)
    // const ctx = document.getElementById('Bar-chart')

    
    // const barChart= new Chart(ctx,{
    //     type:'bar',
    // })

    
    const barchart = (
       confirmed ?
            (<Bar data={{
               
                lebels: ['infected', 'Recovered', 'Deaths'],
                datasets: [{
                    label: 'People',
                    
                    backgroundColor: [
                        'rgba(0,0,255,0.5)', 'rgba(0,255,0,0.5)', 'rgba(255,0,0,0.5)',
                    ],
                    data: [confirmed.value, recovered.value, deaths.value],
                }]
            }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` }
                }}
            />)
            : (null)
    )
    //  lineChart.register(CategoryScale)
    return (
        <div className={styles.container} >
            {country ? barchart : lineChart}

        </div>
    )
}

export default Charts;
