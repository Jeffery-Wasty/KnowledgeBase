const serveProfile = (_req, res) => {
  // Fetch data from model based off of req.params.id
  // Feed into profile
  res.render('profile', {});
};

module.exports = {
  serve: serveProfile
};
