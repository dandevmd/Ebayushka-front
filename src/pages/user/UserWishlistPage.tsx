import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserSideBarComponent from "../../components/sidebar/UserSideBarComponent";
import { useAppSelector } from "../../redux/hooks";
import { IproductInCart } from "../../redux/slices/productSlice";
import { getAll, remove } from "../../services/wishlistService";

const UserWishlistPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const [wishlistItems, setWishlistItems] = useState([]);

  const getTheWishlist = async () => {
    try {
      const list = await getAll(user.token);

      list && setWishlistItems(list.wishlist);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWishlist = async (id: string) => {
    try {
      const data = await remove(user.token, id);
      if (data.ok) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTheWishlist();
  }, [removeFromWishlist]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserSideBarComponent />
        </div>
        <div className="col">
          <h4>Wishlist</h4>

          <div>
            {wishlistItems &&
              wishlistItems.map((p: any) => (
                <div
                  key={p?._id}
                  className="alert alert-secondary d-flex justify-content-between align-items-center"
                >
                  <Link to={`/product/${p.slug}`}>{p.title}</Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromWishlist(p._id)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWishlistPage;
