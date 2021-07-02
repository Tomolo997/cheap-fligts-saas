import axios from "axios";
import { useParams } from "react-router";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export default function SuccessfullyUpgraded() {
  const API_CALL =
    process.env.NODE_ENV === "development" ? "http://localhost:8000" : "";

  const { id, priceId } = useParams();
  useEffect(() => {
    upgareMe();
  }, []);

  const upgareMe = async () => {
    const res = await axios.post(API_CALL + "/api/v1/users/successUpgrade", {
      id: id,
      priceId: priceId,
    });
    console.log(res);
  };

  return (
    <div>
      You have succesuflly upgraded <Link to="/dashboard">Go to dashboard</Link>
    </div>
  );
}
