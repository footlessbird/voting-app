import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPoll } from "../actions";

type IValues = {
  question: string;
  options: string[];
};

function CreatePoll() {
  // console.log("CreatePoll props ", props);
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
      placeholder="Type an option.."
      type="text"
      value={option}
      key={i}
      onChange={(e) => handleOption(e, i)}
    />
  ));

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label className="form-label" htmlFor="question">
        Question
      </label>
      <input
        className="form-input"
        placeholder="Type a question.."
        type="text"
        name="question"
        value={values.question}
        onChange={handleChange}
      />
      <label className="form-label" htmlFor="option">
        Option
      </label>
      <div>{renderOptions}</div>
      <div className="buttons_center">
        <button className="button" type="button" onClick={addOption}>
          Add option
        </button>
        <button className="button" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default CreatePoll;
