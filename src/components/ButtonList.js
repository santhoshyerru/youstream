import React from "react";
import Button from "./Button";

const ButtonList = () => {
  return (
    <div className="flex overflow-x-scroll no-scrollbar">
      <Button name={"All"} />
      <Button name={"Gaming"} />
      <Button name={"Javascript"} />
      <Button name={"Programming"} />
      <Button name={"DSA"} />
      <Button name={"Web"} />
      <Button name={"NextJs"} />
      <Button name={"Cooking"} />
      <Button name={"Valentines"} />
      <Button name={"Workout"} />
      <Button name={"Live"} />
      <Button name={"Cricket"} />
      <Button name={"Songs"} />
      <Button name={"Comedy"} />
      <Button name={"Action"} />
    </div>
  );
};

export default ButtonList;
