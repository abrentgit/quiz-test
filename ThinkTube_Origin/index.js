
const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

let NEXT_PAGE_TOKEN = '';
let CURRENT_QUERY = '';


function getDataFromApi (searchTerm, callback) {
  const query = {
    q: `${searchTerm}`,
    part: 'snippet', 
    key: 'AIzaSyCgUidNU1Cgur2MMASCGT8e2gvbWN7sZj8',
    maxResults: 2
  };
  if (NEXT_PAGE_TOKEN!=='') {
    query.pageToken = NEXT_PAGE_TOKEN;
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query,callback);
}


//render is the look of it

function renderResults(result) {
  return `
  <div class="video-result">
    <h3>${result.snippet.title}</h3>
    <a href='https://www.youtube.com/watch?v=${result.id.videoId}' target='_blank'><img src='${result.snippet.thumbnails.medium.url}'></a>
  </div>
  `;
}


/// process the reveal and render

function processYoutubeSearchData(data) {

  NEXT_PAGE_TOKEN = data.nextPageToken;
  const totalResults = data.pageInfo.totalResults;

  const results = data.items.map(function(item, index) {
    return renderResults(item);
  });
  $('.js-search-results').html(results);
  $('.js-search-results').show();
  $('.js-search-results').append(`<h2>You have ${totalResults} results </h2>`);
  $('.more-button').show();
}


function initialize() {
  $('.js-search-form').submit(event => {
    event.preventDefault(); 
    const queryTarget = $(event.currentTarget).find(".js-query");
    const query = queryTarget.val(); 
    CURRENT_QUERY = query;
    NEXT_PAGE_TOKEN = '';
    queryTarget.val(''); // clear input
    getDataFromApi(query, processYoutubeSearchData);
  });

  $('.js-next-results').on('click', event => {
    event.preventDefault();
    getDataFromApi(CURRENT_QUERY, processYoutubeSearchData); 
  }); 
}

$(initialize);
