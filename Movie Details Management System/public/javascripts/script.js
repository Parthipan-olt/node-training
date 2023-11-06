function sendRequest(url, data) {
  $.ajax({
    url, // Specify the URL
    data,
    contentType: 'application/json',
    dataType: 'json',
    type: 'POST',
    success(res) {
      console.log(res);
    },
    error(err) {
      console.error(err);
    },
  });
}

function getFormValuesAsObject(form) {
  const formData = new FormData(form);
  const formObject = {};

  formData.forEach((value, key) => {
    formObject[key] = value;
  });
  return formObject;
}

$('#addNewMovie').on('submit', function (e) {

  const data = $(this).serialize();
  const url = '/add-new-movie'
  console.log(data);
  sendRequest(url, data)
});