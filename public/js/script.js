/* eslint-disable no-unused-vars */
// Show or hide the add artist box
var showAddArtist = () => {
  var add_artist_box = document.getElementById('add-artist-box');

  add_artist_box.style.display =
    !add_artist_box.style.display || add_artist_box.style.display == 'none'
      ? 'block'
      : 'none';
  document.getElementById('artist-form').reset();
};
