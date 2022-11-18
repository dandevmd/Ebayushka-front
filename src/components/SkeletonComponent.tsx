import { Card, Skeleton } from "antd";
import { useAppSelector } from "../redux/hooks";

const SkeletonComponent = ({ count }: { count?: number }) => {
  let propCount = count ? count : 9;

  const cards = () => {
    let totalCards = [];

    for (let s = 0; s < propCount; s++) {
      totalCards.push(
        <Card className="col-md-3 m-2" key={s + 1}>
          <Skeleton active />
        </Card>
      );
    }
    return totalCards;
  };

  return <div className="row pb-3 justify-content-center">{cards()!}</div>;
};

export default SkeletonComponent;
