import React, { useState, useEffect } from "react";

function HexagonGraph() {
    const [graphData, setGraphData] = useState([60, 60, 60, 40, 60, 80]);

    useEffect(() => {
        drawGraph();
    }, []);

    const drawGraph = () => {
        const CANVAS_SIZE = 100;
        const CANVAS_CENTER = CANVAS_SIZE / 2;
        const MAX_VALUE = 100;
        const TAG_RADIUS = 5; // 꼭짓점 표시 점의 반지름
        const LINE_COLOR = "#5E47D2"; // 꼭짓점 이어주는 선 색상
        const POLYGON_COLOR = "rgba(94, 71, 210, 0.5)"; // 육각형 내부 색상
        const STEP = 20;
        const STEPS = [20, 40, 60, 80, 100];
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // 회색 원 그리기
        ctx.beginPath();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#D9D9D9";
        for (let i = 0; i < STEPS.length; i++) {
            const radius = ((CANVAS_SIZE * STEPS[i]) / MAX_VALUE) * 0.4;
            ctx.arc(CANVAS_CENTER, CANVAS_CENTER, radius, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
        }
        ctx.closePath();

        // 원을 6등분하는 선 그리기
        ctx.beginPath();
        ctx.strokeStyle = "#D9D9D9";
        const angle = Math.PI / 3; // 육각형의 한 변이 120도이므로, 반으로 나누면 60도
        for (let i = 0; i < 3; i++) {
            const halfRadius = ((CANVAS_SIZE * 100) / MAX_VALUE) * 0.4;
            const lineX1 =
                CANVAS_CENTER + halfRadius * Math.cos(angle * i + Math.PI / 6); // 30도 더 돌리기
            const lineY1 =
                CANVAS_CENTER + halfRadius * Math.sin(angle * i + Math.PI / 6); // 30도 더 돌리기
            const lineX2 =
                CANVAS_CENTER +
                halfRadius * Math.cos(angle * (i + 3) + Math.PI / 6); // 30도 더 돌리기
            const lineY2 =
                CANVAS_CENTER +
                halfRadius * Math.sin(angle * (i + 3) + Math.PI / 6); // 30도 더 돌리기
            ctx.moveTo(lineX1, lineY1);
            ctx.lineTo(lineX2, lineY2);
        }
        ctx.stroke();
        ctx.closePath();

        // 꼭짓점 그리기
        ctx.beginPath();
        ctx.fillStyle = "#5E47D2";
        for (let i = 0; i < 6; i++) {
            const currentValue = graphData[i];
            const ratio = currentValue / MAX_VALUE;
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const radius = CANVAS_SIZE * ratio * 0.4; // 값을 적절한 범위로 변환하여 반지름 계산

            const x = CANVAS_CENTER + radius * Math.cos(angle);
            const y = CANVAS_CENTER + radius * Math.sin(angle);

            ctx.beginPath();
            ctx.arc(x, y, TAG_RADIUS, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.closePath();

        // 꼭짓점을 이어주는 선 그리기
        ctx.beginPath();
        ctx.strokeStyle = LINE_COLOR;
        for (let i = 0; i < 6; i++) {
            const currentValue = graphData[i];
            const ratio = currentValue / MAX_VALUE;
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const radius = CANVAS_SIZE * ratio * 0.4; // 값을 적절한 범위로 변환하여 반지름 계산

            const x = CANVAS_CENTER + radius * Math.cos(angle);
            const y = CANVAS_CENTER + radius * Math.sin(angle);

            ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // 육각형 내부 색상 채우기
        ctx.fillStyle = POLYGON_COLOR;
        ctx.fill();
    };

    return (
        <div
            className="graph"
            style={{ position: "relative", width: "600px", height: "500px" }}
        >
            <canvas
                id="canvas"
                width="100"
                height="100"
                style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    right: "0",
                    bottom: "0",
                    margin: "auto",
                }}
            ></canvas>
            <button
                className="spec"
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "2%",
                    transform: "translateX(-50%)",
                }}
            >
                스펙 1
            </button>
            <button
                className="spec"
                style={{
                    position: "absolute",
                    left: "88%",
                    top: "25%",
                    transform: "translateX(-50%)",
                }}
            >
                스펙 2
            </button>
            <button
                className="spec"
                style={{
                    position: "absolute",
                    left: "88%",
                    top: "70%",
                    transform: "translateX(-50%)",
                }}
            >
                스펙 3
            </button>

            <button
                className="spec"
                style={{
                    position: "absolute",
                    left: "50%",
                    bottom: "2%",
                    transform: "translateX(-50%)",
                }}
            >
                스펙 4
            </button>
            <button
                className="spec"
                style={{
                    position: "absolute",
                    left: "12%",
                    top: "70%",
                    transform: "translateX(-50%)",
                }}
            >
                스펙 5
            </button>
            <button
                className="spec"
                style={{
                    position: "absolute",
                    left: "12%",
                    top: "25%",
                    transform: "translateX(-50%)",
                }}
            >
                스펙 6
            </button>
        </div>
    );
}

export default HexagonGraph;
