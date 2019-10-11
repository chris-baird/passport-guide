$('.get-info').on('click', event => {
  $.get('/api/info')
    .then(data => {
      console.log(data);
    })
    .catch(err => console.log(err));
});
