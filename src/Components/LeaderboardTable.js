
import React, { useState, useEffect } from 'react';

function LeaderboardTable(props) {

    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        updateData();
    }, [props.leaderboard])

    function updateData() {
        let dataObj = props.leaderboard ? (props.leaderboard.sort((a, b) => a.positions[a.positions.length - 1] - b.positions[b.positions.length - 1])) : []
        setTableData(dataObj)
    }


    return (
        <div style={{ width: "100%" }}>
            <table style={{ width: "100%" }}>
                <tr style={{ textAlign: "center", background: "black", color: "white", height: 60, width: "100%" }}>
                    <td style={{ fontSize: 18, width: "20%" }}>מיקום</td>
                    <td style={{ fontSize: 18, width: "20%" }}>ניקוד אחרון</td>
                    <td style={{ fontSize: 18, width: "60%" }}>קבוצה</td>
                </tr>
                {tableData.map(p =>
                    <tr style={{ textAlign: "center", background: p.color, height: 60, width: "100%" }}>
                        <td style={{ fontSize: 24, width: "20%" }}>
                            <span style={{
                                background: "white",
                                borderRadius: "15%",
                                display: "inline-block",
                                width: "50%",
                            }
                            }>
                                {p.positions[p.positions.length - 1]}
                            </span>
                        </td>
                        <td style={{ fontSize: 24, width: "20%" }}>{p.score}</td>
                        <td style={{ fontSize: 20, width: "60%" }}>{p.displayName}</td>
                    </tr>
                )}
            </table>
        </div>
    );
}

export default LeaderboardTable;
