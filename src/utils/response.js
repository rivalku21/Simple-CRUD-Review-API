const responseSuccess = (res, message) => {
    res.status(200);
    res.type("application/json");
    res.json({
      code: 200,
      status: 'sukses',
      message
    });
};

const responseFailed = (res, message) => {
    res.status(500);
    res.send({
      code: 500,
      status: 'gagal',
      message
    });
};

const responseForbidden = (res, message) => {
  res.status(403);
  res.send({
    code: 403,
    status: 'Forbidden',
    message
  });
};

module.exports = { responseSuccess, responseFailed, responseForbidden };
  