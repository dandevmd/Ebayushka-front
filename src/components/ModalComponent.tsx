import React, { useState, Dispatch, SetStateAction } from "react";
import { Modal, Button } from "antd";
import { StarOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import {
  getProductBySlug,
  rateProductRequest,
} from "../services/productService";
import { toast } from "react-toastify";

interface IcomponentProps {
  children: React.ReactNode;
  newProductRating: number;
  setRerenderAfterRatingChange: Dispatch<SetStateAction<boolean>>
}

const RatingModal: React.FC<IcomponentProps> = ({
  children,
  newProductRating,
  setRerenderAfterRatingChange
}) => {
  const { user } = useAppSelector((state) => state.user);
  const { product } = useAppSelector((state) => state.product);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleModal = () => {
    if (user && user.token) {
      return setModalVisible(true);
    }
    navigate("/login");
  };

  const addReview = async () => {
    await rateProductRequest(
      user.token,
      newProductRating,
      product._id,
      user._id
    );
    setRerenderAfterRatingChange(true)
    setModalVisible(false);
    toast.success("Thanks for your review. It will apper soon");
    
  };

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" /> <br />{" "}
        {user ? "Leave rating" : "Login to leave rating"}
      </div>
      <Modal
        title="Leave your rating"
        centered
        open={modalVisible}
        onOk={addReview}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
