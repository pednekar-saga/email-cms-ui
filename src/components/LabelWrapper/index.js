import React from "react";
import { List, Avatar, Badge } from "antd";

function LabelWrapper({ data, setLabelData }) {
  return (
    <List
      header={<div>Top labels </div>}
      itemLayout="horizontal"
      dataSource={data}
      bordered
      style={{
        overflowY: "scroll",
        height: "768px"
      }}
      renderItem={item => (
        <List.Item onClick={e => setLabelData(item.data[0].data)}>
          <List.Item.Meta
            title={item && item.from}
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
          <Badge count={item.data[0].data.length} overflowCount={999} />
        </List.Item>
      )}
    />
  );
}
export default LabelWrapper;
