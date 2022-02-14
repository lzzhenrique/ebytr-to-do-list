module.exports = async (err, _req, res, _next) => {
  if (err.isJoi) {
    const { status, message } = err.details[0];

    return res.status(status).json({ message });
  }
  if ('code' in err) {
    return res.status(err.code).json({ message: err.message });
  }

  console.error(err);
  return res.status(500).json({ message: err.message });
};
