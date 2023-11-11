function postToServer(url, data) {
  $.ajax({
    url,
    type: 'POST',

    dataType: 'json',
    contentType: 'application/json',

    success(response) {
      console.log(response)
    },
    error(xhr, status, error) {
      console.log('AJAX Error:', status, error);
      console.log('Response Text:', xhr.responseText);
    }
  });
}

function formDataToObject(formData) {
  const formDataObject = {};

  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  return formDataObject;
}

$('#addNewMovie').on('submit', function (e) {
  e.preventDefault();
  const form = $('#addNewMovie')[0];
  const url = $(this).attr('action');
  const formData = formDataToObject(new FormData(form));
  postToServer(url, formData);
});