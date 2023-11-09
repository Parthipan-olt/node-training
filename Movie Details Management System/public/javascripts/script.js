// Toggle the visibility of the 'review-input-div'
$('.add-review-button').click(() => {
  $('.review-input-div').toggle();
});

// Use the `reduce` function to build the form data object
function formDataToObject(formData) {
  const formDataObject = {};

  formData.forEach((value, key) => {
    formDataObject[key] = value;
  });

  return formDataObject;
}

function appendDataToTable(data) {
  const tbody = $('tbody');

  console.log(data);

  data.response.forEach((detail) => {
    const newRow = `<tr>
    <td>${detail.title}</td>
    <td>${detail.genre}</td>
    <td>${detail.director}</td>
    <td>${detail.runtime}</td>
    <td>${detail.release_date}</td>
    <td class="text-center">
      <a href="/view" class="bg-primary" data-id="${detail.movieId}"> View</a>
      <a href="/edit" class="bg-success" data-id="${detail.movieId}">Edit</a>
      <a href="#" class="bg-danger" data-toggle="modal" data-target="#deleteRowConfirmation" data-id="${detail.movieId}">Delete
      </a>
    </td>
  </tr>`; // <td>${detail.review_count}</td>
    tbody.append(newRow);
  });
}

// Call the function to append data

async function serverReqFunc(url, data, callback) {
  $.ajax({
    url,
    dataType: 'json',
    data: JSON.stringify(data),
    contentType: 'application/json',
    type: 'POST',
    success(response) {
      // This code block will run if the AJAX request is successful
      console.log(response);
      if (Array.isArray(response)) {
        const newURL = '/list';
        window.location.href = newURL;
        appendDataToTable(response)
      }
    },
    error(xhr, status, error) {
      console.error(error);
    },
  });
}

$('#addNewMovie').submit((e) => {
  e.preventDefault();

  // Get a reference to the form element
  const form = $('#addNewMovie')[0];

  // Convert form data to an object
  const formData = formDataToObject(new FormData(form));

  // Call the serverReqFunc and pass a success callback function
  serverReqFunc($(this).attr('action'), formData);
});