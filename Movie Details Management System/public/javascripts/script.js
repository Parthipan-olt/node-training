$('.delete-button').on('click', function () {
  const movieId = $(this).data('movieid');
  const deleteLink = $('.confirm-delete-button');
  deleteLink.attr('href', `/delete-row?movieId=${movieId}`);
});
$('.add-review-button').click(() => {
  $('.review-input-div').toggle();
});