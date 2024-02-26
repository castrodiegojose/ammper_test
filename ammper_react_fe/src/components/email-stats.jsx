import React, { useState, useEffect } from "react";
import EmailStatsComponent from "./component-stats";
import { Link } from "react-router-dom";

function EmailStats() {
  const [emailStats, setEmailStats] = useState({
    opened: null,
    clicked: null,
    rejected: null,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_URL_BE_EMAIL_STATS);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        console.log(data);
        setEmailStats(data);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Email Stats Screen</h1>
      <EmailStatsComponent
        opened={emailStats.opened}
        clicked={emailStats.clicked}
        rejected={emailStats.rejected}
      />

      <button>
        <Link to="/">Email Sender</Link>
      </button>
    </div>
  );
}

export default EmailStats;
