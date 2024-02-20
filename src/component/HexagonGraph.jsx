import React, { useState, useEffect } from "react";
import "../css/HexagonGraph.css";
import axios from "axios";

function HexagonGraph() {
    const [achievements, setAchievements] = useState([]);
    const [goalTitles, setGoalTitles] = useState([]);
    const [graphData, setGraphData] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const token = localStorage.getItem("token");
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Token ${token}`;

                const response = await axios.get("http://127.0.0.1:8000/home/");
                setGoalTitles(response.data.map((goal) => goal.title));
                setAchievements(
                    response.data.map((goal) => goal.completion_rate)
                );
            } catch (error) {
                console.error(
                    "그래프에서 데이터를 가져오는 중 에러 발생:",
                    error
                );
            }
        };

        fetchGoals();
    }, []);

    useEffect(() => {
        const data = achievements.map((achievement) => parseInt(achievement));
        setGraphData(data);
        drawGraph();
    }, [achievements]);

    const drawGraph = () => {
        const CANVAS_SIZE = 280;
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
        ctx.lineWidth = 2;
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

    // 버튼의 선택 여부를 추적하는 상태
    const [selectedSpec, setSelectedSpec] = useState(null);

    // 버튼 클릭 시 호출되는 함수
    const handleSpecClick = (index) => {
        // 클릭된 버튼의 인덱스를 선택된 상태로 설정
        setSelectedSpec(index);
    };

    return (
        <div
            className="graph"
            style={{ position: "relative", width: "100vw", height: "38vh" }}
        >
            <canvas
                id="canvas"
                width="280"
                height="280"
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
                className={`spec ${selectedSpec === 1 ? "selected" : ""}`}
                onClick={() => handleSpecClick(1)}
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "3%",
                    transform: "translateX(-50%)",
                }}
            >
                {goalTitles[0]}
            </button>
            <button
                className={`spec ${selectedSpec === 2 ? "selected" : ""}`}
                onClick={() => handleSpecClick(2)}
                style={{
                    position: "absolute",
                    left: "85%",
                    top: "25%",
                    transform: "translateX(-50%)",
                }}
            >
                {goalTitles[1]}
            </button>
            <button
                className={`spec ${selectedSpec === 3 ? "selected" : ""}`}
                onClick={() => handleSpecClick(3)}
                style={{
                    position: "absolute",
                    left: "85%",
                    top: "70%",
                    transform: "translateX(-50%)",
                }}
            >
                {goalTitles[2]}
            </button>

            <button
                className={`spec ${selectedSpec === 4 ? "selected" : ""}`}
                onClick={() => handleSpecClick(4)}
                style={{
                    position: "absolute",
                    left: "50%",
                    bottom: "3%",
                    transform: "translateX(-50%)",
                }}
            >
                {goalTitles[3]}
            </button>
            <button
                className={`spec ${selectedSpec === 5 ? "selected" : ""}`}
                onClick={() => handleSpecClick(5)}
                style={{
                    position: "absolute",
                    left: "12%",
                    top: "70%",
                    transform: "translateX(-50%)",
                }}
            >
                {goalTitles[4]}
            </button>
            <button
                className={`spec ${selectedSpec === 6 ? "selected" : ""}`}
                onClick={() => handleSpecClick(6)}
                style={{
                    position: "absolute",
                    left: "12%",
                    top: "25%",
                    transform: "translateX(-50%)",
                }}
            >
                {goalTitles[5]}
            </button>
        </div>
    );
}

export default HexagonGraph;
