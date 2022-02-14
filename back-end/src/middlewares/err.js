const UNPROCESSABLE_ENTITY = 422;

module.exports = async (err, _req, res, _next) => {
  if (err.isJoi) {
    return res.status(UNPROCESSABLE_ENTITY).json({ message: err.details[0].message });
  }
  if ('code' in err) {
    return res.status(err.code).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: err.message });
};
