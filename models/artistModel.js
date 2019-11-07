// getArtists
// Input: res; response
//
// Gets the artists from the database.
const getProfile = res => {
  res.render('artist', {});
};

module.exports = {
  get: getProfile
};
