import React, { useState, Dispatch, SetStateAction } from "react";
import { useDispatch } from "react-redux";
import { createPoll } from "../actions/index";

type IValues = {
  question: string;
  options: string[];
};

function CreatePoll() {
  const dispatch = useDispatch();
  const [values, setValues] = useState<IValues>({
    question: "",
    options: ["", ""],
  });

  function handleChange(e) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createPoll(values));
  }

  function handleOption(e, index) {
    const options = [...values.options];
    options[index] = e.target.value;
    setValues({ ...values, options });
  }

  function addOption() {
    setValues({
      ...values,
      options: [...values.options, ""],
    });
  }

  const renderOptions = values.options.map((option, i) => (
    <input
      className="form-input"
      type="text"
      value={option}
      key={i}
      onChange={(e) => handleOption(e, i)}
    />
  ));

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Type a question.."
          type="text"
          name="question"
          value={values.question}
          onChange={handleChange}
        />
        <div>{renderOptions}</div>

        <button type="button" onClick={addOption}>
          Add option
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default CreatePoll;
