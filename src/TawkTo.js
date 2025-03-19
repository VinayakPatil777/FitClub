import { useEffect } from "react";
import { useAuth } from "./components/AuthContextProvider.jsx";
const TawkTo = () => {
  const { userPlan } = useAuth();
  console.log(userPlan)
  useEffect(() => {
    if (userPlan !== "gold") return;
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6714a7ec2480f5b4f5906b9a/1iakavu8e";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [userPlan]);

  return null;
};

export default TawkTo;
