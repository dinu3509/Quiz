// SubmittedQuiz.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import "react-circular-progressbar/dist/styles.css";
import Header from "../components/Header";
const SmallCircle = ({ value, text, sub, color }) => (
  <div className="flex flex-col items-center p-4">
    <div style={{ width: 110, height: 110 }}>
      <CircularProgressbar
        value={value}
        text={`${Math.round(value)}%`}
        styles={buildStyles({
          textSize: "18px",
          pathColor: color,
          textColor: "#fff",
          trailColor: "#333",
        })}
      />
    </div>
    <div className="text-white mt-3">{text}</div>
    {sub !== undefined && <div className="text-gray-300 text-sm">{sub}</div>}
  </div>
);

const SubmittedQuiz = () => {
  const { score = 0, total = 0, accuracy = 0, wrong = 0 } = useLocation().state || {};
  const safeTotal = total === 0 ? 1 : total;

  const correctPercent = (score / safeTotal) * 100;
  const wrongPercent = (wrong / safeTotal) * 100;
  const accuracyPercent = Math.min(Math.max(accuracy, 0), 100);

  // Map accuracy % to a color from red → yellow → green
  const getAccuracyColor = (percent) => {
    const r = percent < 50 ? 255 : Math.round(255 - ((percent - 50) * 255) / 50);
    const g = percent > 50 ? 255 : Math.round((percent * 255) / 50);
    return `rgb(${r}, ${g}, 0)`;
  };

  return (
    <div className="bg-black min-h-screen flex flex-col gap-20"> 
     <Header></Header>
    <div className="flex flex-col justify-center items-center p-6 ">
     

      <div className="w-full max-w-4xl border border-white rounded-2xl text-white p-8">
        <div className="text-4xl font-bold text-center mb-6">RESULTS</div>

        <div className="md:flex md:justify-around gap-6">
          <SmallCircle
            value={correctPercent}
            text="Correct"
            sub={`${score}`}
            color="green"
          />
          <SmallCircle
            value={wrongPercent}
            text="Wrong"
            sub={`${wrong}`}
            color="red"
          />
          <SmallCircle
            value={accuracyPercent}
            text="Accuracy"
            sub={`${Math.round(accuracyPercent)}%`}
            color={getAccuracyColor(accuracyPercent)}
          />
        </div>
        <div className="text-center">Go to 
          <span><NavLink
               
                to="/home"
                className="rounded-xl cursor-pointer  text-center"
              > HOME
                
              </NavLink></span>
        </div>
      </div>
    </div></div>
  );
};

export default SubmittedQuiz;
