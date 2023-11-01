let currentSearchUrl = ''; // Store the latest URL sent to the server for updating page numbers
let currentPageNumber = 1; // Store the current page number

// more - genre elements
const moreGenre = document.querySelector('.more-filters');
const moreGenreButton = document.querySelector('#more');
let movieName; // variable stores the search value
$('.results-container').hide(); // Initially hide the results container

function displayMovieResults(data) {
  $('#searchBox').val(movieName);
  $('.results-container').empty();
  $('.search-results').empty();

  // display if results  are available
  if (data.total_results > 0) {
    $('.results-container').show();

    const resultsHeader = '<div class="search-results"></div>';
    $('.results-container').append(resultsHeader);

    // iterate data.results
    const movieResults = data.results.map((movie) => {

      //use poster image if available else use a placeholder image
      const posterImage = movie.poster_path ?
        `http://image.tmdb.org/t/p/w154/${movie.poster_path}` :
        'images/placeholder.jpeg';

      //add the results to the container
      return `<div class="results-container-two container"> 
      <a href="/details?id=${movie.id}">
        <img class="movie-detail" title="${movie.title}" src="${posterImage}" alt="movie poster">
        <p title="${movie.title}" class="movie-detail">${movie.title}</p>
        </a>
      </div>
  `;
    });

    // Append all movie results to the .search-results element
    $('.search-results').empty().append(movieResults);
  } else {
    //if no results found
    displayNoResults();
  }
}

function createPageButtons(totalPages) {
  // clear the container
  $('.page-number-div').empty();
  let totalPageCount = totalPages;
  const maxVisibleButtons = 5;
  const currentDisplayedPage = currentPageNumber;

  //round page number to 500 if page number is greater than 500
  if (totalPages > 500) {
    totalPageCount = 500;
  }

  //create page number buttons if pages > 1
  if (totalPages > 1 && totalPageCount !== 1) {

    const pageDiv = $('<div>').addClass('page-number-div');
    $('.results-container').append(pageDiv);

    //initialize the first and last pages
    if (totalPageCount > maxVisibleButtons) {
      let startPage = Math.max(currentDisplayedPage - Math.floor(maxVisibleButtons / 2), 1);
      const endPage = Math.min(startPage + maxVisibleButtons - 1, totalPageCount);

      // check if there are more than 5 buttons
      if (endPage - startPage < maxVisibleButtons) {
        startPage = endPage - maxVisibleButtons + 1;
      }

      //add first page button
      if (startPage > 1) {
        const firstPageButton = $('<button>').addClass('page-numbers').attr('value', 1).html('1');
        $('.page-number-div').append(firstPageButton);
      }

      // add ellipsis after first page number button
      if (startPage > 2) {
        const ellipsisStart = $('<span>').html('...');
        $('.page-number-div').append(ellipsisStart);
      }

      for (let i = startPage; i <= endPage; i += 1) {
        // create page buttons
        const pageSelect = $('<button>').addClass('page-numbers').attr('value', i).html(i);

        // check current active page
        if (i === currentPageNumber) {
          pageSelect.addClass('active-page');
        }

        //append page number buttons
        $('.page-number-div').append(pageSelect);
      }

      //add ellipsis before last button
      if (endPage < totalPageCount - 1) {
        const ellipsisEnd = $('<span>').html('...');
        $('.page-number-div').append(ellipsisEnd);
      }

      // create last page button
      if (endPage < totalPageCount) {
        const lastPage = totalPageCount;
        const lastPageButton = $('<button>').addClass('page-numbers').attr('value', lastPage).html(lastPage);
        $('.page-number-div').append(lastPageButton);
      }
    }
  } else {
    for (let i = 1; i <= totalPageCount; i += 1) {
      //create page-buttons
      const pageSelect = $('<button>').addClass('page-numbers').attr('value', i).html(i);

      //check current active page
      if (i === currentPageNumber) {
        pageSelect.addClass('active-page');
      }

      //append page numbers
      $('.page-number-div').append(pageSelect);
    }
  }
  handlePageNumberClick();
}

// Display message if no results found
function displayNoResults() {
  const noResultsMessage = $('<p class="d-inline-block">').text('No Results Found!!!');

  // clear results containers
  $('.results-container').empty();
  $('.search-results').empty();

  //show and append the message
  $('.results-container').show();
  $('.results-container').append(noResultsMessage);
}

// fetch movies
function fetchMovies(url) {
  try {
    //ajax call
    $.ajax({
      type: 'POST',
      url,
      success(response) {

        //success
        displayMovieResults(response);
        createPageButtons(response.total_pages);
      },
      error(error) {
        //error
        console.error('An error occurred:', error);
        displayNoResults();
      },
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
  }
}

// handle submit
function handleSubmit(e) {
  e.preventDefault();
  const searchQuery = $('#searchBox').val();
  movieName = searchQuery;
  //hide 'more'filters
  moreGenre.style.display = 'none';

  //clear selected genre
  $('#genre').val('');
  currentSearchUrl = `${$(this).attr('action')}/${searchQuery}`;
  fetchMovies(`${currentSearchUrl}/1`);
}

// event handler for submit
$(document.forms[0]).on('submit', handleSubmit);

//Update url by selected genre
function getResultsByGenre() {
  moreGenre.style.display = 'none';
  const genre = $(this).attr('value');

  //clear searchbox
  $('#searchBox').val('');

  //update URL with path and genreID
  currentSearchUrl = `/genre/${genre}`;

  //append page number (1) to the url - initial page
  const url = `${currentSearchUrl}/1`
  fetchMovies(url);
}

//event handler for genre click
$('.sort, .filter-options').on('click', getResultsByGenre);

//update URL by selected page number
function handlePageNumberClick() {
  function onPageNumberClick() {

    // update current pagenumber
    currentPageNumber = parseInt($(this).val(), 10);

    //append page number parameter to URL
    const url = `${currentSearchUrl}/${currentPageNumber}`;

    // Call the function to fetch movies with the updated URL
    fetchMovies(url);
  }
  //event handler for page number click
  $('.page-numbers').on('click', onPageNumberClick);
}

//hide more Genre options
$('.results-container, .carousel').on('click', () => {
  moreGenre.style.display = 'none';
});

//show more Genre options
moreGenreButton.addEventListener('click', () => {
  moreGenre.style.display = 'block';
});