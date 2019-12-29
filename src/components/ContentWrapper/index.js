import React, { useState, useEffect } from "react";
import { Layout, Row, Col, Progress, Select, Divider } from "antd";
import SideBarWrapper from "../SideBarWrapper";
import LabelWrapper from "../LabelWrapper";
import MessageList from "../MessageList";
import client from "../../shared/services/client";
const _ = require("lodash");
const { Content } = Layout;
const { Option } = Select;
function ContentWrapper() {
  const [messages, setMessages] = useState([]);
  const [pageToken, setPageToken] = useState("");
  const [labelData, setLabelData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [emailCluster, setEmailCluster] = useState([]);
  const [fetchCount, setFetchCount] = useState(100);

  useEffect(() => {
    setData();
  }, [pageToken, fetchCount]);

  function onChange(value) {
    setFetchCount(parseInt(value));
    setLoaded(false);
    setMessages([]);
  }
  const deleteMessages = ids => {
    setLoaded(false);
    client
      .post("/batch/delete", { ids })
      .then(_ => {
        alert("Deleted");
        setLoaded(true);
        setFetchCount(fetchCount)
      })
      .catch(err => console.error(err));
  };

  const formatMessages = () => {
    // const result = _.keyBy(response, "from");
    // let duplicateIds = response.map(mail => mail.from);

    const result = _.chain(messages)
      // Group the elements of Array based on `from` property
      .groupBy("source")
      // `key` is group's name (from), `value` is the array of objects
      .map((value, key) => ({ from: key.split(" ")[0], data: value }))
      .value()
      .sort((a, b) => b.data.length - a.data.length);

    const final = _.chain(result)
      .groupBy("from")
      .map((value, key) => ({ from: key, data: value }))
      .value();
    // console.log("After Format", final);
    // console.log("Label", final[0].data[0].data);

    return final;
  };

  const setData = () => {
    if (messages.length < fetchCount) {
      if (pageToken) {
        client.get(`/list?results=100&&pageToken=${pageToken}`).then(res => {
          // console.log("here in", res);
          setMessages([...messages, ...res.data.response]);
          setPageToken(res.data.pageToken);
        });
      } else {
        client
          .get(`/list?results=100`)
          .then(res => {
            // console.log("here ", res.data.response);

            setMessages(res.data.response);
            setPageToken(res.data.pageToken);
            // setLabelData();
          })
          .catch(err => console.error(err));
      }
    }

    console.log(messages.length, fetchCount);

    if (messages.length === fetchCount) {
      setEmailCluster(formatMessages());
      setLoaded(true);
    }
  };

  const calculatePercentage = (messageCount, fetchCount) =>
    Math.ceil((messageCount / fetchCount) * 100);

  return (
    <>
      {!loaded ? (
        <Progress
          type="circle"
          status="active"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068"
          }}
          percent={calculatePercentage(messages.length, fetchCount)}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2em"
          }}
        />
      ) : (
        <Content style={{ padding: "0 50px" }}>
          <Layout
            style={{
              padding: "24px 0",
              margin: "16px 0",
              background: "#fff",
              minHeight: "100vh"
            }}
          >
            {/* <SideBarWrapper /> */}
            <Content style={{ padding: "0 24px" }}>
              <Row gutter="16">
                <label> Select email count</label>
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="Select email count"
                  onChange={onChange}
                >
                  <Option value="100">100</Option>
                  <Option value="500">500</Option>
                  <Option value="1000">1000</Option>
                  <Option value="2000">2000</Option>
                  <Option value="3000">3000</Option>
                  <Option value="5000">5000</Option>

                </Select>
              </Row>
            </Content>
            <Divider />
            <Content style={{ padding: "0 24px" }}>
              <Row gutter="16">
                <Col xs={24} sm={16} md={6} lg={6}>
                  <LabelWrapper
                    data={emailCluster}
                    setLabelData={setLabelData}
                  />
                </Col>
                <Col xs={24} sm={16} md={18} lg={18}>
                  <MessageList
                    messages={labelData}
                    deleteMessages={deleteMessages}
                  />
                </Col>
              </Row>
            </Content>
          </Layout>
        </Content>
      )}
    </>
  );
}
export default ContentWrapper;
