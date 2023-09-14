const getTrip = async () => {
  const res = await fetch("http://localhost:3001/trip");
  const trip = await res.json();
  return trip;
};

const updateTrip = async (trip) => {
  const res = await fetch("http://localhost:3001/trip", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(trip),
  });

  const updatedTrip = await res.json();
  return updatedTrip;
};

module.exports = {
  getTrip,
  updateTrip,
};
