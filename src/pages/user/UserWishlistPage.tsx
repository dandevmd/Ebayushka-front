import React from "react";
import UserSideBarComponent from "../../components/sidebar/UserSideBarComponent";

const UserWishlistPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserSideBarComponent />
        </div>
        <div className="col">UserWishlistPage</div>
      </div>
    </div>
  );
};

export default UserWishlistPage;
