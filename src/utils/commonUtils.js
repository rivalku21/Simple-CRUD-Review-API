const getPublicIp = () => {
  if (process.env.NODE_ENV == "production") {
    return `127.0.0.1:${process.env.PORT}`; //diubah sesuai hosting
  }
  return `127.0.0.1:${process.env.PORT}`;
};

module.exports = { getPublicIp };
