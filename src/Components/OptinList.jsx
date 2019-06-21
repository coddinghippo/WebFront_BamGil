import React, { Component } from "react";
import styled from "styled-components";
import { Button } from "antd";
import uuidv1 from "uuid/v1";
import { lineColors, fontSize } from "../Styles/_mixin";
// import Card from "./Card";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const Card = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 1px solid #ccc;
`;

const BarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  width: 90%;
  max-width: 90%;
  height: 1rem;
  background: sky-blue;
  // &:first-child {
  //   border-top-left-radius: 5px;
  //   border-bottom-left-radius: 5px;
  // }
`;

const Bar = styled.div`
  text-align: center;
  height: 20px;
  &:first-of-type {
    border-top-left-radius: 3rem;
    border-bottom-left-radius: 3rem;
  }
  &:last-of-type {
    border-top-right-radius: 3rem;
    border-bottom-right-radius: 3rem;
  }
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
  position: fixed;
  justify-content: center;
  width: 100%;
  bottom: 0;
`;

const StyledButton = styled(Button)`
  width: 90%;
  height: 3rem;
  color: white;
  background: #000033;
  border-radius: 1.5rem;
  margin-bottom: 1.3rem;
  backgrouncolor: #000;
  font-weight: bold;
`;

export default class OptinList extends Component {
  state = {
    taxi: { time: 0, distance: 0, price: 0 },
    makcha: [{ routeNm: "도보", time: 0 }],
    route: { price: null, lastTimeList: [{ lastTimeDay: "00:00:30 (수서행)" }] }
  };

  // Json-server Option
  componentDidMount() {
    const { taxiInfo, pathOptionList } = this.props.data;
    const makcha = pathOptionList[0].makchaPathList;
    const route = pathOptionList[0].route;

    this.setState({ taxi: taxiInfo, makcha, route });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data !== this.props.data) {
      const { taxiInfo, pathOptionList } = this.props.data;
      if (pathOptionList.length) {
        const makcha = pathOptionList[0].makchaPathList;
        const route = pathOptionList[0].route;

        this.setState({
          taxi: taxiInfo,
          makcha,
          route
        });
      }
    }
  }

  renderBar() {
    const makcha = this.state.makcha;
    const totalTime = makcha.reduce((a, x) => a + x.time, 0);

    return makcha.map((item, idx) => {
      let length = Math.floor((Number(item.time) / totalTime) * 100);
      if (length < 24) length = 24;
      length = String(length) + "%";
      return (
        <Bar
          className="haha"
          key={uuidv1()}
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

  renderStn() {
    console.log("log: ", this.state);
    const makcha = this.state.makcha;
    const totalTime = makcha.reduce((a, x) => a + x.time, 0);

    return makcha.map((item, idx) => {
      let length = Math.floor((Number(item.time) / totalTime) * 100);
      if (length < 24) length = 24;
      length = String(length) + "%";
      return (
        <Bar
          key={uuidv1()}
          style={{
            width: length,
            color: "black",
            textAlign: "left"
          }}
        >
          <span style={{ fontSize: 8 }}>
            {item.routeNm === "도보" ? "도보" : item.fname}
          </span>
        </Bar>
      );
    });
  }

  render() {
    console.log(this.state);
    const { taxi, makcha, route } = this.state;
    const totalTime = makcha.reduce((a, x) => a + x.time, 0);
    const totalDistance = makcha.reduce((a, x) => a + x.distance, 0) / 1000;
    const { lastTimeList } = this.state.route;
    return (
      <Container speed={0.8} horizontal={false}>
        <Card>
          <TextContainer>
            <Text>
              지하철 {totalTime}분 | 막차{" "}
              {lastTimeList[0].lastTimeDay.slice(0, 5)}
            </Text>
            <p>
              {totalDistance.toFixed(1)}km |{" "}
              {String(Math.floor(this.state.route.price / 1000)) +
                "," +
                String(this.state.route.price % 1000)}
              원 | {makcha[0].time}분
            </p>
          </TextContainer>
          <BarContainer className="nana" style={{ marginBottom: 0 }}>
            {this.renderBar()}
          </BarContainer>
          <BarContainer style={{ marginTop: 0 }}>
            {this.renderStn()}
          </BarContainer>
        </Card>
        {/* <Card makcha={makcha} route={route} />
        <Card makcha={makcha} route={route} /> */}

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
        <ButtonContainer>
          <StyledButton size="large">다른 정보 더 보기</StyledButton>
        </ButtonContainer>
      </Container>
    );
  }
}
