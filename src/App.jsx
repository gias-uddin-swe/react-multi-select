/* eslint-disable no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [names, setNames] = useState([]);
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  console.log(selectedOption);

  const handleNameChange = (inputValue, actionMeta) => {
    console.log(inputValue);
    let temp = [];

    if (inputValue) {
      try {
        (async () => {
          const data = await fetch(
            `http://localhost:5000/allNames/${inputValue}`
          );
          const result = await data.json();
          const name = result.map((n) => {
            const option = {
              label: n.name,
              value: n.name,
              color: "#" + Math.floor(Math.random() * 16777215).toString(),
            };
            temp.push(option);
          });
          setNames(temp);
        })();
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(names);

  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return { ...styles, color: data.color };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color,
        color: "#000000",
      };
    },
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: "#000000",
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: "#000000",
        cursor: "pointer",
        ":hover": {
          color: "#000000",
        },
      };
    },
  };
  return (
    <div className="App">
      <CreatableSelect
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={names}
        onInputChange={handleNameChange}
        isMulti
      />
    </div>
  );
}

export default App;
