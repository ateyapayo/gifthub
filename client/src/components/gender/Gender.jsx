import "./Gender.css";

import { getGender, updateGender } from "../../api/gender";
import { useEffect, useState } from "react";

import { IoMaleSharp, IoFemaleSharp, IoMaleFemaleSharp } from "react-icons/io5";

const Gender = (props) => {
  const [gender, setGender] = useState({
    genderType: "",
  });

  const fetchGender = async () => {
    const gender = await getGender();
    setGender(gender);
  };

  const onClickGender = async (gender) => {
    const updatedGender = await updateGender({
      ...gender,
      genderType: gender,
    });
    setGender(updatedGender);
    props.update(gender);
  };

  useEffect(() => {
    fetchGender();
  }, []);

  return (
    <div className="gender">
      <div>
        <h3 aria-label="Your destination" title="Your destination">
          Your trip to <span></span> begins here!{" "}
        </h3>
        <h3 aria-label="Your trip title" title="Your trip title">
          {" "}
          It's time to pack your things for your <span></span>.
        </h3>
      </div>
      <div className="weather">
        <p>Gender</p>
        <div className="gender-buttons">
          <button
            title="Non-binary"
            className={`${gender.genderType === "non-binary" && "non-binary"}`}
            aria-label="Non-binary gender button"
            onClick={() => onClickGender("non-binary")}
          >
            <IoMaleFemaleSharp />
          </button>
          <button
            title="Female"
            className={`${gender.genderType === "female" && "female"}`}
            aria-label="Female gender button"
            onClick={() => onClickGender("female")}
          >
            <IoFemaleSharp />
          </button>
          <button
            title="Male"
            className={`${gender.genderType === "male" && "male"}`}
            aria-label="Male gender button"
            onClick={() => onClickGender("male")}
          >
            <IoMaleSharp />
          </button>

          {gender.genderType && (
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
    </div>
  );
};

export default Gender;
