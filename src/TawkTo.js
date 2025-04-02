import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const TawkTo = () => {
  const [userPlan, setUserPlan] = useState(null);

  useEffect(() => {
    const fetchUserPlan = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        console.warn("No active session. User not logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("users")
        .select("plan")
        .eq("id", session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user plan:", error.message);
      } else {
        setUserPlan(data.plan.toLowerCase());
      }
    };

    fetchUserPlan();
  }, []);

  useEffect(() => {
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
