import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const Loader: React.FC = () => (
  <div
    style={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Spin indicator={antIcon} />
  </div>
);

export default Loader;
