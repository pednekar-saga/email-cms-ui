import React from "react";
import { PageHeader } from "antd";

function ViewMessage({ title, desciption, toggleViewMessage }) {
  console.log(title);
  return (
    <PageHeader
      style={{
        border: "1px solid rgb(235, 237, 240)"
      }}
      onBack={() => toggleViewMessage(false)}
      title={title}
      subTitle={desciption}
    />
  );
}
export default ViewMessage;
