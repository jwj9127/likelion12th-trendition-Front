import React, { useState } from "react";
import "../css/HexagonGraph.css"; // 스타일 파일 import

const HexagonGraph = () => {
    // 임시 데이터
    const initialData = [80, 40, 60, 30, 70, 90];

    const [values, setValues] = useState(initialData);

    const calculateVertexCoordinates = () => {
        const angleIncrement = (2 * Math.PI) / values.length;
        const radius = 100;
        const centerX = 150;
        const centerY = 150;

        const coordinates = values.map((value, index) => {
            const angle = index * angleIncrement;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY - (value / 100) * radius * Math.sin(angle); // y좌표 계산 수정
            return `${x},${y}`;
        });

        return coordinates.join(" ");
    };

    const calculateTextX = (index) => {
        const angleIncrement = (2 * Math.PI) / values.length;
        const radius = 120;
        const centerX = 150;

        const angle = index * angleIncrement;
        const x = centerX + radius * Math.cos(angle);
        return x;
    };

    const calculateTextY = (index) => {
        const angleIncrement = (2 * Math.PI) / values.length;
        const radius = 120;
        const centerY = 150;

        const angle = index * angleIncrement;
        const y = centerY - radius * Math.sin(angle); // y좌표 계산 수정
        return y;
    };

    return (
        <div className="hexagon-container">
            <svg className="hexagon" viewBox="0 0 300 300">
                <polygon
                    className="hexagon-polygon"
                    points={calculateVertexCoordinates()}
                />
                <g className="hexagon-content">
                    {values.map((value, index) => (
                        <text
                            key={index}
                            x={calculateTextX(index)}
                            y={calculateTextY(index)}
                        >
                            {value}
                        </text>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default HexagonGraph;
