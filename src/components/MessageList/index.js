import React, { useState, useEffect } from "react";
import { List, Avatar, Button } from "antd";
import ViewMessage from "../ViewMessage";

function DisplayMessage(title, description, toggleViewMessage) {
  return (
    <ViewMessage
      title={title}
      description={description}
      toggleViewMessage={toggleViewMessage}
    />
  );
}

function MessageList({ messages, deleteMessages }) {
  const [viewMessage, toggleViewMessage] = useState(false);
  return (
    <List
      header={
        <div>
          Messages
          <span style={{ float: "right" }}>
            <Button
              shape="circle"
              icon="delete"
              onClick={e => deleteMessages(messages.map(message => message.id))}
            />
          </span>
        </div>
      }
      itemLayout="horizontal"
      dataSource={!viewMessage ? messages : []}
      bordered
      //   loading={true}

      renderItem={item => (
        <List.Item
          onClick={e => {
            toggleViewMessage(!viewMessage);
            DisplayMessage(item.source, item.snippet, toggleViewMessage);
          }}
        >
          {
            <List.Item.Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={
                <a href="https://ant.design">
                  {item.source ? item.source.trim() : "Not Provied"}
                </a>
              }
              description={item.snippet ? item.snippet : ""}
            />
          }
        </List.Item>
      )}
    >
      {viewMessage && DisplayMessage("Display this", toggleViewMessage)}
    </List>
  );
}
export default MessageList;
