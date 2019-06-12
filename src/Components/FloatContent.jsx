import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";

const Container = styled.div`
  max-width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #eee;
  width: 94%;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// document.querySelector("#root > div > div > div > div.sc-kpOJdX.dxtEmv > div > div > div:nth-child(1) > div:nth-child(3)")
// #root > div > div > div > div.sc-kpOJdX.dxtEmv > div > div > div:nth-child(1) > div:nth-child(3)
const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const TopLine = styled.div`
  border-bottom: 2px solid #bbb;
  height: 1rem;
  margin-bottom: 1rem;
  width: 60%;
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 90%;
  height: 1rem;
  background: sky-blue;
`;

const Bar = styled.div`
  text-align: center;
  height: 20px;
`;

const TextContainer = styled.div`
  width: 90%;
  margin: 1rem 0;
`;

const Text = styled.p`
  margin: 0.5rem 0;
  width: 90%;
  font-weight: 700;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: stretch;
`;
const LeftButton = styled(Button)`
  margin: 0.5rem;
  margin-right: 0;
  flex: 1;
  color: black;
  font-size: 0.7rem !important;
  border: 1px solid black;
`;
const RightButton = styled(Button)`
  flex: 3;
  background: #5e5e5e;
  margin: 0.5rem;
  color: white;
  font-size: 0.7rem !important;
`;

const lineColors = {
  도보: "#ccc",
  "1호선": "#052f93",
  "2호선": "#10a643",
  "3호선": "#ea8406",
  "4호선": "#00a8e6",
  "5호선": "#a95094",
  "6호선": "#d08d1a",
  "7호선": "#657931",
  "8호선": "#e74e6d",
  "9호선": "#be941c",
  경강선: "#004ea7",
  경의중앙선: "#79c0a0",
  경춘선: "#33C7A7",
  공항철도: "#038fa0",
  분당선: "#fcd204",
  서해: "#8be800",
  수인선: "#fbb901",
  신분당선: "#cd2234",
  용인경전철: "#56ab32",
  우이신설경전철: "#b7b7b7",
  의정부경전철: "#f6ba02",
  인천1호선: "#6496df",
  인천2호선: "#fd9800"
};

export default class FloatContent extends Component {
  state = {
    taxi: { time: 0, distance: 0, price: 0 },
    makcha: [{ routeNm: "도보", time: 0 }],
    pharmList: [
      {
        pharmName: "센느약국",
        pharmAddr: "서울특별시 강남구 테헤란로4길 6 상가 122호",
        pharmTel: "02-501-2450"
      }
    ],
    route: { price: null, lastTimeList: [{ lastTimeDay: "00:00:30 (수서행)" }] }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      const { taxiInfo, pathOptionList } = this.props.data;
      const makcha = pathOptionList[0].makchaPathList;
      const route = pathOptionList[0].route;

      this.setState({
        taxi: taxiInfo,
        makcha,
        route
      });
    }
    // const total = this.state.pathList.reduce((a, obj) => a + obj.time, 0);
    // this.setState({ total });
  }

  handleEndReached() {
    // console.log("load more");
  }

  renderBar() {
    const makcha = this.state.makcha;
    const totalTime = makcha.reduce((a, x) => a + x.time, 0);

    return makcha.map((item, idx) => {
      let length =
        String(Math.floor((Number(item.time) / totalTime) * 100)) + "%";
      return (
        <Bar
          key={idx}
          style={{
            width: length,
            backgroundColor: lineColors[item.routeNm],
            color: "white"
          }}
        >
          {item.time}분
        </Bar>
      );
    });
  }

  render() {
    console.log(this.state);
    const { taxi, makcha } = this.state;
    const totalTime = makcha.reduce((a, x) => a + x.time, 0);
    const totalDistance = makcha.reduce((a, x) => a + x.distance, 0) / 1000;
    const { pharmTel, pharmName, pharmAddr } = this.state.pharmList[0];
    const { lastTimeList } = this.state.route;
    return (
      <Container speed={0.8} horizontal={false}>
        {/* <TopLine /> */}

        <Card>
          <TextContainer>
            <Text>
              지하철 {totalTime}분 | 막차{" "}
              {lastTimeList[0].lastTimeDay.slice(0, 8)}
            </Text>
            <p>
              {totalDistance.toFixed(1)}km |{" "}
              {String(Math.floor(this.state.route.price / 1000)) +
                "," +
                String(this.state.route.price % 1000)}
              원 | {makcha[0].time}분
            </p>
          </TextContainer>
          <BarContainer>{this.renderBar()}</BarContainer>
        </Card>

        <Card>
          <TextContainer>
            <Text>택시 {taxi.time}분</Text>
            <p>
              {(taxi.distance / 1000).toFixed(1)}km | 약{" "}
              {String(Math.floor(taxi.price / 1000)) +
                "," +
                String(taxi.price % 1000)}
              원 | 도보 0분
            </p>
          </TextContainer>
          <BarContainer>
            <Bar
              style={{
                width: "100%",
                backgroundColor: "#ffd300",
                color: "white"
              }}
            >
              {taxi.time}분
            </Bar>
          </BarContainer>
        </Card>

        {/* <Card style={{ border: "none" }}>
          <TextContainer>
            <Text>{pharmName}</Text>
            <p>1.3km | {pharmTel} | 도보 4분</p>
          </TextContainer>
          <BarContainer>
            <Bar
              style={{
                width: "100%",
                backgroundColor: "#ccc",
                color: "white"
              }}
            >
              4 분
            </Bar>
          </BarContainer>
        </Card> */}

        <ButtonContainer>
          <LeftButton type="default" shape="round" size="large">
            확인
          </LeftButton>
          <RightButton type="default" shape="round" size="large">
            다른 정보 더 보기
          </RightButton>
        </ButtonContainer>
      </Container>
    );
  }
}
