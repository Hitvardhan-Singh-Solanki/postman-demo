export const userResponsObject = ({ email, _id, image }) => ({
  email,
  image,
  _id
});

const checkTime = i => {
  return i < 10 ? '0' + i : i;
};

export const startTime = () => {
  const today = new Date(),
    h = checkTime(today.getHours()),
    m = checkTime(today.getMinutes()),
    s = checkTime(today.getSeconds());
  return h + ':' + m + ':' + s;
};
