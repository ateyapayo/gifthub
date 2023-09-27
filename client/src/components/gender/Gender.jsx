import "./Gender.css";

import { useEffect, useState } from "react";

import { IoMaleSharp, IoFemaleSharp, IoMaleFemaleSharp } from "react-icons/io5";

import { getTarget, updateTarget } from "../../api/target";

const Gender = (props) => {
  const [target, setTarget] = useState({
    gender: "",
  });

  const fetchTarget = async () => {
    const target = await getTarget();
    setTarget(target);
  };

  const onClickGender = async (target) => {
    const updatedTarget = await updateTarget({
      gender: target,
    });
    setTarget(updatedTarget);
    props.update(updatedTarget);
  };

  useEffect(() => {
    fetchTarget();
  }, []);

  return (
    <div className="gender">
      <p>Gender:</p>
      <div className="gender-buttons">
        <button
          title="Non-binary"
          className={`${target.gender === "non-binary" && "non-binary"}`}
          aria-label="Non-binary gender button"
          onClick={() => onClickGender("non-binary")}
        >
          <IoMaleFemaleSharp />
        </button>
        <button
          title="Female"
          className={`${target.gender === "female" && "female"}`}
          aria-label="Female gender button"
          onClick={() => onClickGender("female")}
        >
          <IoFemaleSharp />
        </button>
        <button
          title="Male"
          className={`${target.gender === "male" && "male"}`}
          aria-label="Male gender button"
          onClick={() => onClickGender("male")}
        >
          <IoMaleSharp />
        </button>

        {target.gender && (
          <span
            className="clear-gender"
            aria-label="Reset gender button"
            onClick={() => onClickGender("")}
          >
            Reset
          </span>
        )}
      </div>
    </div>
  );
};

export default Gender;
