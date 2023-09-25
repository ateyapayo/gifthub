export const getTarget = async () => {
  const res = await fetch("http://localhost:3001/target");
  const target = await res.json();
  return target;
};

export const updateTarget = async (target) => {
  const res = await fetch("http://localhost:3001/target", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(target),
  });

  const updatedTarget = await res.json();
  return updatedTarget;
};
