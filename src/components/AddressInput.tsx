import React from "react";
import {
  InsertRowRightOutlined,
  GlobalOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Input } from "antd";

interface IcomponentProps {
  addressChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressInput: React.FC<IcomponentProps> = ({ addressChangeHandler }) => (
  <div className="w-75">
    <>
      <label htmlFor="country">Country</label>
      <Input
        size="middle"
        id="country"
        placeholder="Enter here..."
        prefix={<GlobalOutlined />}
        onChange={(e) => addressChangeHandler(e)}
        required
      />
    </>
    <div className="my-3">
      <label htmlFor="city">City</label>
      <Input
        size="middle"
        id="city"
        placeholder="Enter here..."
        prefix={<InsertRowRightOutlined />}
        onChange={(e) => addressChangeHandler(e)}
        required
      />
    </div>

    <>
      <label htmlFor="city">Address</label>
      <Input
        size="middle"
        id="address"
        placeholder="Enter here..."
        prefix={<HomeOutlined />}
        onChange={(e) => addressChangeHandler(e)}
        required
      />
    </>
  </div>
);

export default AddressInput;
