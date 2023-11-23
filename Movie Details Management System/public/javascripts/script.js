
function postMovieDetails(url, data) {
    $.ajax({
        url,
        data,
        type: 'POST',
        success(success) {
            window.location.href = '/';
        },
        error(error) {
            appendErrorsToForm(error.errorMsgs);
        }
    })
}

// store the form data in an object
function getFormValuesAsObject(form) {
    const formData = new FormData(form);
    const formObject = {};

    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    return formObject;
}

// get the form data and url
function getFormData(e, form) {
    e.preventDefault();
    const url = $(this).attr('action');
    const data = getFormValuesAsObject(form);
    postMovieDetails(url, data)
}


$('#addNewMovie').on('submit', function (e) {
    getFormData(e, $('#addNewMovie')[0]);
});

$('#editMovie').on('submit', function (e) {
    getFormData(e, $('#editMovie')[0]);
});