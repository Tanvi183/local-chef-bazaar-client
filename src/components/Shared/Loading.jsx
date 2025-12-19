import Lottie from "lottie-react";
import loadingAnimation from "../../assets/lottie/loading.json";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-64">
        <Lottie animationData={loadingAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loading;
