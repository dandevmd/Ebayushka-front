import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCount((currentCount: number) => --currentCount);
    }, 1000);

    count === 0 && navigate("/");

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div className="h-100 d-flex flex-column justify-content-center  mt-3">
      <div className="d-flex flex-column justify-content-center align-items-center  mt-3">
        <>
          <h2 className="d-flex  justify-content-center">404 Error</h2>
          <h4> Page {window.location.href} does not exist or you don't have proper rights !</h4>
        </>

        <>
          <h2>You will be redirected in {count}</h2>
        </>
      </div>
    </div>
  );
};

export default NotFoundPage;
