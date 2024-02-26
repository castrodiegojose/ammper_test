import React from "react";

const EmailStatsComponent = ({ opened, clicked, rejected }) => {
  return (
    <div>
      <h2>Email Stats</h2>
      <p>Emails Opened: {opened}</p>
      <p>Emails Clicked: {clicked}</p>
      <p>Emails Rejected: {rejected !== null ? rejected : "N/A"}</p>
    </div>
  );
};

export default EmailStatsComponent;
