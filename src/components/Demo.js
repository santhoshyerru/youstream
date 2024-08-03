import React, { useMemo, useState } from "react";
import { findNthPrime } from "../utils/helper";

const Demo = () => {
  const [text, setText] = useState(0);
  const [theme, setTheme] = useState(true);
  const prime = useMemo(() => findNthPrime(text), [text]);
  return (
    <div
      className={
        "border border-black p-2 m-4 w-96 h-96 " +
        (theme && "bg-gray-900 text-white")
      }
    >
      <div className="m-2">
        <button className="bg-green-200 p-2" onClick={() => setTheme(!theme)}>
          Toggle
        </button>
      </div>
      <input
        className="border border-black w-72 px-2 text-black"
        type="number"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <p>{prime}</p>
    </div>
  );
};

export default Demo;
