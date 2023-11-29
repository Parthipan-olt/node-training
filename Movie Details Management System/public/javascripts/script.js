function postMovieDetails(url, data) {
    console.log(url)
    $.ajax({
        url,
        data,
        type: 'POST',
        success(success) {
            success.redirectTo ? window.location.href = success.redirectTo : ''
            console.log(success)
        },
        error(error) {
            if (error.responseJSON && error.responseJSON.error && error.responseJSON.details) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text:  error.responseJSON.details.toString().toUpperCase(),
                  })
            }
            console.error(error)
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
function getFormData(form, url) {

    const data = getFormValuesAsObject(form);
    postMovieDetails(url, data)
}


$('#addNewMovie').on('submit', function (e) {

    e.preventDefault();
    const url = $(this).attr('action');
    getFormData($('#addNewMovie')[0], url);
});

$('#editMovie').on('submit', function (e) {
    e.preventDefault();
    const url = $(this).attr('action');
    getFormData($('#editMovie')[0], url);
});

$('#addReviewForm').on('submit', function (e) {
    e.preventDefault();
    if ($('.review-input').val() === '') {
        return false
    }
    const url = $(this).attr('action');
    getFormData($('#addReviewForm')[0], url);
});


    

