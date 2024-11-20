import React from "react";
import { useLocation } from "react-router-dom";
import "./FixedExpenseListPage.css";
import { ResponsivePie } from "@nivo/pie";

export default function FixedExpenseListPage(props) {
  const location = useLocation();
  const amount = location.state?.amount;

  // 차트 데이터 정의
  const data = [
    {
      id: "수학학원",
      label: "수학학원",
      value: 40,
    },
    {
      id: "학습지",
      label: "학습지",
      value: 20,
    },
    {
      id: "자유이용",
      label: "자유이용",
      value: 40,
    },
  ];
  const colors = ["#0084FC", "#00DB49", "#FFD455"];
  return (
    <>
      <div className="Container">
        <p style={{ marginBottom: "0" }}>김도은님에게 용돈보내기</p>
        <p className="Font">얼마를 보낼까요?</p>
        <div style={{ height: "400px", width: "100%" }}>
          <ResponsivePie
            data={data}
            colors={colors}
            margin={{ top: -120, right: 80, bottom: 10, left: 80 }}
            innerRadius={0.5}
            padAngle={0.7}
            cornerRadius={3}
            activeOuterRadiusOffset={8}
            borderWidth={1}
            borderColor={{
              from: "color",
              modifiers: [["darker", 0.2]],
            }}
            arcLinkLabelsSkipAngle={100}
            arcLinkLabelsTextColor="transparent"
            arcLinkLabelsThickness={0}
            arcLinkLabelsColor={{ from: "color" }}
            arcLabelsSkipAngle={10}
            arcLabelsTextColor="#FFFFFF"
            arcLabel={(d) => d.id}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#0084FC",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "rgba(255, 255, 255, 0.3)",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            legends={[
              {
                anchor: "bottom",
                direction: "row",
                justify: false,
                translateX: 0,
                translateY: 40,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: "#999",
                itemDirection: "left-to-right",
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: "circle",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#000",
                    },
                  },
                ],
              },
            ]}
          />
        </div>

        <h1 style={{ marginTop: -150 }}>{amount}원</h1>
        <hr />
        <button
          className="complete-button"
          style={{ backgroundColor: "#F3F3F3", color: "black" }}
        >
          추가
        </button>

        {/* 고정 지출 내역, 추가되면 자동으로 추가 되도록 변경*/}
        <span style={{ marginTop: 40 }}>금액</span>
        <span>받는 분</span>
        <span>송금계좌번호</span>
        <span>자동이체날짜</span>
        <button
          className="complete-button"
          style={{ backgroundColor: "gray", marginTop: "30px" }}
        >
          송금하기
        </button>
      </div>
    </>
  );
}
