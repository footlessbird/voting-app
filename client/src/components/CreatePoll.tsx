import React, { useState, Dispatch, SetStateAction } from "react";
import { connect } from "react-redux";
import { createPoll } from "../actions/index";

type IValues = {
  question: string;
  options: string[];
};

function CreatePoll({ createPoll }: any) {
  const [values, setValues] = useState<IValues>({
    question: "",
    options: ["", ""],
  });

  function handleChange(e: any) {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    createPoll(values);
  }

  function handleOption(e: any, index: number) {
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

  const renderOptions: any = values.options.map((option, i) => (
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

export default connect(null, { createPoll })(CreatePoll);
