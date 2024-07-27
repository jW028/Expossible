function buildQueryString(params) {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
}


function getInstagramAnalytics() {
    //Instagram API token
    var accessToken = 'EAB4nW95kTowBO5mJWRGTMescZCtXcpebZCZBPMEKKNJ8VJmpcKs7PQtGY23CPSe9BA4MRzZBqLWd0UZBPoMjUDG01mA3lZAhZATtE5Tt8nrHeNBR8ZBDMZAc3mVmeWEE8c1NtHrEqBSa2qXZAZAarhk6teZC3ZCl8cQvSWT45GvpbEvyVZAoJgtRaj2pfkNFzW';

    var instagramAccountId = '17841467536016661';
    var apiVersion = 'v20.0';

    // Endpoint to fetch media posts
    var postsEndpoint = `https://graph.facebook.com/${apiVersion}/${instagramAccountId}/media`;
    const postParams = {
      fields: 'id,caption,timestamp,like_count,comments_count,media_type,permalink',
      access_token: accessToken
    };

    var postsResponse = UrlFetchApp.fetch(postsEndpoint + '?'+ buildQueryString(postParams));
    var postsData = JSON.parse(postsResponse.getContentText());

    const postsWithInsights = postsData.data.map(post => {
      const insightsEndpoint = `https://graph.facebook.com/${apiVersion}/${post.id}/insights`;
      const insightsParams = {
        metric: 'reach,impressions',
        access_token: accessToken
      };

      const insightsResponse = UrlFetchApp.fetch(insightsEndpoint + '?' + buildQueryString(insightsParams));
      const insightsData = JSON.parse(insightsResponse.getContentText());

      const reach = insightsData.data.find(d => d.name === 'reach')?.values[0]?.value || 0;
      const impressions = insightsData.data.find(d => d.name === 'impressions')?.values[0]?.value || 0;

      return {
        id: post.id,
        caption: post.caption,
        timestamp: post.timestamp,
        likes: post.like_count,
        comments: post.comments_count,
        mediaType: post.media_type,
        permalink: post.permalink,
        reach: reach,
        impressions, impressions
      };
    });

    Logger.log(postsWithInsights);

    return postsWithInsights

  }

function writePostsToSheet(posts) {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheet = ss.getSheetByName("Posts");
  sheet.clear();

  const headers = ['ID', 'Caption', 'Timestamp', 'Likes', 'Comments', 'Media Type', 'Permalink', 'Reach', 'Impressions'];
  sheet.appendRow(headers);

  posts.forEach(post => {
    sheet.appendRow([
      post.id,
      post.caption,
      post.timestamp,
      post.likes,
      post.comments,
      post.mediaType, 
      post.permalink,
      post.reach,
      post.impressions
    ]);
  });

  sheet.autoResizeColumns(1, headers.length);
}


function updateInstagramAnalyticsSheet() {
  try {
    const posts = getInstagramAnalytics();
    writePostsToSheet(posts);
    Logger.log(`Updated sheet with ${posts.length} Instagram posts.`);
  } catch (error) {
    Logger.log('An error occurred: ' + error.toString());
    if (error.stack) {
      Logger.log('Stack trace: ' + error.stack);
    }
  }
}





