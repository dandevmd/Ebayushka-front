import React from "react";
import TypewriterComponent from "typewriter-effect";

interface IcomponentProps{
  text:string[]
}

const JumbotronComponent:React.FC<IcomponentProps> = ({ text }) => {
  return (
    <div className="jumbotron h1 text-center text-danger font-weight-bold">
      <TypewriterComponent
        options={{
          strings: text,
          autoStart: true,
          loop: true,
        }}
      />{" "}
    </div>
  );
};

export default JumbotronComponent;
