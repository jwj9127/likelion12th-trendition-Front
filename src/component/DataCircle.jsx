import React from "react";

const DataCircle = ({ x, y, value }) => {
    return (
        <g>
            <circle cx={x} cy={y} r="5" fill="red" />
            <text x={x} y={y - 10} textAnchor="middle">
                {value}
            </text>
        </g>
    );
};

export default DataCircle;
