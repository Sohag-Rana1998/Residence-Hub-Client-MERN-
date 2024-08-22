import React from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
const Loader = () => {
  return (
    <div>
      <div className="w-full min-h-screen flex justify-center items-center">
        <ScaleLoader color="#36d7b7" height={80} width={5} />
      </div>
    </div>
  );
};

export default Loader;
