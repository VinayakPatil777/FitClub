import { useEffect } from "react";
import { useAuth } from "./components/AuthContextProvider.jsx";

const TawkTo = () => {
  const { userPlan } = useAuth();

  useEffect(() => {
    if (!userPlan) {
      console.warn("User plan is undefined. Waiting for update...");
      return;
    }

    console.log("Current Plan:", userPlan);

    if (userPlan !== "gold") {
      console.log("Live chat is only available for Gold members.");
      return;
    }

    console.log("Loading TawkTo live chat...");

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://embed.tawk.to/6714a7ec2480f5b4f5906b9a/1iakavu8e";
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    return () => {
      console.log("Removing TawkTo script...");
      document.body.removeChild(script);
    };
  }, [userPlan]);

  return null;
};

export default TawkTo;
