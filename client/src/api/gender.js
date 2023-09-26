export const getGender = async () => {
  const res = await fetch("http://localhost:3001/gender");
  const gender = await res.json();
  return gender;
};

export const updateGender = async (gender) => {
  const res = await fetch("http://localhost:3001/gender", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gender),
  });

  const updatedGender = await res.json();
  return updatedGender;
};
