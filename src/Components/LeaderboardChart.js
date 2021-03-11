
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

function LeaderboardChart(props) {

    const [chartData, setChartData] = useState({
        labels: ['10:00','10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'],
        datasets: []
    });

    useEffect(() => {
        updateData();
    }, [props.leaderboard])

    function updateData() {
        let dataObj = {}
        dataObj.labels = ['10:00','10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00'];
        dataObj.datasets = [];
        if (props.leaderboard) {
            props.leaderboard.forEach(player => {
                dataObj.datasets.push({
                    label: player.displayName,
                    data: player.positions,
                    fill: false,
                    backgroundColor: player.color,
                    borderColor: player.color,
                })
            })
        }
        setChartData(dataObj)
    }

    const options = {
        scales: {
            yAxes: [
                {
                    ticks:{
                        reverse: true,
                        suggestedMin: 1,
                        stepSize: 1
                    }
                }
            ]
        }
    }



    return (
        <div>
            <Line height={"800vw"} width={"1500vw"} data={chartData} options={options} />
        </div>
    );
}

export default LeaderboardChart;
