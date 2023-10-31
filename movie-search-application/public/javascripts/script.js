// latest url sent to the server - can be used to update upon page number change
let currentUrl = '';

// variable to store the current page number
let currentActivePage = 1;

// initially hide the results container
$('.results-container').hide();

// function to display the results
function displayResults(data) {
  $('.results-container').empty();
  $('.search-results').empty();
  if (data.total_results !== 0) {
    // show the results container
    if (typeof data !== 'undefined') {
      $('.results-container').show();

      const header = '<div class="search-results"></div>';

      $('.results-container').append(header);

      // eslint-disable-next-line no-restricted-syntax
      for (const movie of data.results) {
        let image;
        if (movie.poster_path) {
          // if movie have a poster path and image
          image = `http://image.tmdb.org/t/p/w154/${movie.poster_path}`;
        } else {
          // else a placeholder image is used
          image = 'images/ihcoaih.jpeg';
        }

        // display the movie and title
        const results = `<a href="/details?id=${movie.id}">
        <div class="results-container-two container">
                    <img class="movie-detail" title="${movie.title}" src="${image}" alt="image">
                    <p title="${movie.title}" class="movie-detail">${movie.title}</p>
                    </div>
                    </a>`;

        $('.search-results').append(results);
      }
    }
  } else {
    // if there are no results available
    noResults();
  }
}

// create page buttons
function createButtons(totalPage) {
  $('.page-number-div').empty();
  let totalPages = totalPage;
  const maxVisibleButtons = 5; // set the maximum visible buttons to 5-excluded 1st and last buttons
  const currentPage = currentActivePage;
  if (totalPage > 500) {
    totalPages = 500;
  }

  if (totalPage > 1 && totalPages !== 1) {
    const pageDiv = $('<div>').addClass('page-number-div');
    $('.results-container').append(pageDiv);

    if (totalPages > maxVisibleButtons) {
      let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
      const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

      if (endPage - startPage < maxVisibleButtons) {
        startPage = endPage - maxVisibleButtons + 1;
      }

      if (startPage > 1) {
        const firstPageButton = $('<button>').addClass('page-numbers').attr('value', 1).html('1');
        $('.page-number-div').append(firstPageButton);
      }

      if (startPage > 2) {
        const ellipsisStart = $('<span>').html('...');
        $('.page-number-div').append(ellipsisStart);
      }

      for (let i = startPage; i <= endPage; i += 1) {
        const pageSelect = $('<button>').addClass('page-numbers').attr('value', i).html(i);
        if (i === currentActivePage) {
          pageSelect.addClass('active-page');
        }
        $('.page-number-div').append(pageSelect);
      }

      if (endPage < totalPages - 1) {
        const ellipsisEnd = $('<span>').html('...');
        $('.page-number-div').append(ellipsisEnd);
      }

      if (endPage < totalPages) {
        const lastPage = totalPages;
        const lastPageButton = $('<button>').addClass('page-numbers').attr('value', lastPage).html(lastPage);
        $('.page-number-div').append(lastPageButton);
      }
    }
  } else {
    for (let i = 1; i <= totalPages; i += 1) {
      const pageSelect = $('<button>').addClass('page-numbers').attr('value', i).html(i);
      if (i === currentActivePage) {
        pageSelect.addClass('activePage');
      }
      $('.page-number-div').append(pageSelect);
    }
  }
  onPageNumberClick();
}

function noResults() {
  const noResultsMessage = $('<p class=" d-inline-block">').text('No Results Found!!!');

  $('.results-container').empty();
  $('.search-results').empty();
  $('.results-container').show();
  $('.results-container').append(noResultsMessage);
}

// ajax call
function callServer(url) {
  try {
    $.ajax({
      type: 'POST',
      url,
      success(response) {
        displayResults(response);
        createButtons(response.total_pages);
      },
      error(error) {
        console.error('An error occurred:', error);
        noResults();
      },
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

// event handler for the search button click
$(document.forms[0]).on('submit', function (e) {
  e.preventDefault();
  const searchBoxValue = $('#searchBox').val();
  if (searchBoxValue) {
    $('#genre').val(''); // reset the selectbox
    const page = 1; // initially get the results from page 1
    const url = $(this).attr('action').replace(':title', encodeURIComponent(searchBoxValue)).replace(':page', encodeURIComponent(page));
    currentUrl = $(this).attr('action').replace(':title', encodeURIComponent(searchBoxValue));
    callServer(url);
  } else {
    noResults();
  }
});

// event handler to update the results on genre selection
$('.sort, .filter-options').on('click', function () {
  $('#searchBox').val(''); // clear the searchbox value
  const path = '/genre/:id/:page';
  const page = 1;
  const genre = $(this).attr('value'); // Use .attr() to get the "value" attribute
  const url = path.replace(':id', encodeURIComponent(genre)).replace(':page', encodeURIComponent(page));
  currentUrl = path.replace(':id', encodeURIComponent(genre));
  callServer(url);
});

// url updated on page number clicks
function onPageNumberClick() {
  $('.page-numbers').on('click', function () {
    const currentPage = parseInt($(this).val(), 10);
    currentActivePage = currentPage;
    const url = currentUrl.replace(':page', encodeURIComponent(currentPage));
    callServer(url);
  });
}

$('#carousel').on('click', () => {
  const moreFilters = document.querySelector('.more-filters');
  moreFilters.style.display = 'none';
});

const moreElement = document.querySelector('#more');
moreElement.addEventListener('click', () => {
  const moreFilters = document.querySelector('.more-filters');
  moreFilters.style.display = 'block';
});