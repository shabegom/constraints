import React, { useState } from "react";

function getRandomColor(min, max) {
  return Math.random() * (max - min) + min;
}

const Dot = ({ maxTime, avg }) => {
  let r = getRandomColor(0, maxTime) > avg ? getRandomColor(avg, maxTime) : 255;
  let g =
    getRandomColor(0, maxTime) <= avg ? getRandomColor(avg, maxTime) : 255;
  let b = getRandomColor(0, maxTime);

  let a = Math.random();

  let r2 =
    getRandomColor(0, maxTime) > avg ? getRandomColor(avg, maxTime) : 255;
  let g2 =
    getRandomColor(0, maxTime) <= avg ? getRandomColor(avg, maxTime) : 255;
  let b2 = getRandomColor(0, maxTime);

  let a2 = Math.random();

  const baseStyle = {
    background: `linear-gradient(rgba(${r}, ${g}, ${b}, ${a}), rgba(${r2},${g2},${b2},${a2}))`,
    width: "25px",
    height: "25px"
  };

  return <div style={baseStyle}></div>;
};

const MakeDots = ({ numberOfDots, steps, time, people }) => {
  const maxTime = people * time;
  const averageTimePerStep = steps / maxTime;
  return new Array(numberOfDots).fill(
    <Dot maxTime={maxTime} avg={averageTimePerStep} />
  );
};

function App() {
  let [people, setPeople] = useState(0);
  let [time, setTime] = useState(0);
  let [steps, setSteps] = useState(0);
  let [generated, setGenerated] = useState(false);
  return (
    <div>
      {generated ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "auto",
            height: "auto",
            background: "black"
          }}
        >
          <MakeDots
            steps={steps}
            time={time}
            people={people}
            numberOfDots={5000}
          />
        </div>
      ) : (
        ""
      )}
      {!generated ? (
        <div>
          People:{" "}
          <input
            onChange={e => setPeople(e.target.value)}
            placeholder="number of people"
          />
          Time:{" "}
          <input
            onChange={e => setTime(e.target.value)}
            placeholder="time in weeks"
          />
          Items:{" "}
          <input
            onChange={e => setSteps(e.target.value)}
            placeholder="items to complete"
          />
          <p>
            <button onClick={() => setGenerated(true)}>Generate</button>
          </p>
        </div>
      ) : (
        ""
      )}
      <div>
        <h1>What am I looking at?</h1>
        <h2>Constraints Art</h2>
        <p>
          The idea was to take three constraints:
          <ul>
            <li>The amount of people doing the work</li>
            <li>The amount of time, in weeks, to complete the work</li>
            <li>The amount of work items there are (project scope)</li>
          </ul>
          and use them to run some kind of probablility calculation.
        </p>
        <p>
          The output of the probability calculations would dictate the rgba
          values of the gradient background.
          <ul>
            <li>Red coloration means work took longer than it should</li>
            <li>Green coloration means work took less time than it should</li>
            <li>Blue is totally random luck!</li>
            <li>
              Alpha is also random...It should represent something but I haven't
              thought of what yet
            </li>
          </ul>
          So each square represents a simulation showing if the work achieved
          success or failure based on the constraints. It is an oracle of the
          future.
        </p>
        <p>
          <h3>I wouldn't trust this oracle as far as I can spit</h3>
        </p>
      </div>
    </div>
  );
}

export default App;
