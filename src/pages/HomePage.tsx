import JumbotronComponent from "../components/JumbotronComponent";
import { useAppSelector } from "../redux/hooks";
import NewArrivalsComponent from "../components/homeLayouts/NewArrivalsComponent";
import BestSellerComponent from "../components/homeLayouts/BestSellerComponent";

const HomePage = () => {
  return (
    <>
      <JumbotronComponent
        text={["Latest Products", "New Arrivals", "Best Sellers"]}
      />
      <>
        <div className="h1 text-center p-3 my-5 jumbotron">New Arrivals</div>
        <NewArrivalsComponent />
      </>{" "}
      <>
        <div className="h1 text-center p-3 my-5 jumbotron">Best Seller</div>
        <BestSellerComponent />
      </>
    </>
  );
};

export default HomePage;
