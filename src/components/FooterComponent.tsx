import React from "react";
import { GithubOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const FooterComponent = () => {
  return (
    <>
      <footer className="text-center text-lg-start bg-white text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div>
            <a href="" className="me-4 link-secondary">
              <i className="fab fa-google"></i>
            </a>

            <a href="" className="me-4 link-secondary">
              <i className="fab fa-github"></i>
            </a>
          </div>
        </section>

        <section className="">
          <div className="container text-left text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3 text-secondary"></i>Brief
                  description
                </h6>
                <p>
                  This is a full-stack e-commerce project developer with
                  (MERN-stack ).It was implemented the search and filtering by
                  rating, by price, by category of products and the project was
                  integrated with PayPal Sandbox. The user can play the role of
                  user or administrator. Depending on the role of the user, it
                  can delete other users, create other adminni add delete,
                  modify, products or orders.
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Tech used on FrontEnd
                </h6>
                <ul style={{ listStyle: "none" }}>
                  <li className="mb-2">TYPESCRIPT</li>
                  <li className="mb-2">State Management:Redux toolkit</li>
                  <li className="mb-2">
                    Styles:Material Bootstrap + AntDesign
                  </li>
                  <li className="mb-2">Requests:Axios</li>
                  <li className="mb-2">Navigation:React Router Dom 6</li>
                  <li className="mb-2">
                    Others:Toastify, Image-file-resizer, Typewriter-effect,
                    React-Carousel etc.
                  </li>
                </ul>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">
                  Tech used on BackEnd
                </h6>
                <ul style={{ listStyle: "none" }}>
                  <li className="mb-2">TYPESCRIPT</li>
                  <li className="mb-2">Auth: Firebase-admin with JWT</li>
                  <li className="mb-2">Database: MongoDB with Mongoose ORM </li>
                  <li className="mb-2">Logging: Morgan </li>
                  <li className="mb-2">ENV: dotenv</li>
                  <li className="mb-2">Slug generator: Slugify</li>
                  <li>
                    Others: express-async-handler, express-jwt, nodemon etc.
                  </li>
                </ul>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p className="d-flex justify-content-start align-items-center">
                  <span className="h4 mt-2 mr-3">
                    <MailOutlined />
                  </span>
                  <a href="mailTo: danmunteanu420@gmail.com">
                    danmunteanu420@gmail.com
                  </a>
                </p>
                <p className="d-flex justify-content-start align-items-center">
                  <span className="h4 mt-2 mr-3">
                    <GithubOutlined />
                  </span>
                  <a href="https://github.com/dandevmd">dandevmd</a>
                </p>
                <p className="d-flex justify-content-start align-items-center">
                  <span className="h4 mt-2 mr-3">
                    <PhoneOutlined />
                  </span>
                  <a href="tel: +37378584507">+37378584507</a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};

export default FooterComponent;
