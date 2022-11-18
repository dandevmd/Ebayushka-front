import React from "react";
import UserSideBarComponent from "../../components/sidebar/UserSideBarComponent";

const UserHistoryPage = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserSideBarComponent />
        </div>
        <div className="col">UserHistoryPage</div>
      </div>
    </div>
  );
};

export default UserHistoryPage;
