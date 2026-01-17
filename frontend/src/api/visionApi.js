import axios from "axios";

export const getCrowdData = async () => {
  const res = await axios.get("http://localhost:5000/api/vision/crowd");
  return res.data;
};
