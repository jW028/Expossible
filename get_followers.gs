function updateFollowerCount() {

  //Inner function to fetch followers count from Instagram API
  function getFollowersCount() {
    var accessToken = 'EAB4nW95kTowBO5mJWRGTMescZCtXcpebZCZBPMEKKNJ8VJmpcKs7PQtGY23CPSe9BA4MRzZBqLWd0UZBPoMjUDG01mA3lZAhZATtE5Tt8nrHeNBR8ZBDMZAc3mVmeWEE8c1NtHrEqBSa2qXZAZAarhk6teZC3ZCl8cQvSWT45GvpbEvyVZAoJgtRaj2pfkNFzW';

      var instagramAccountId = '17841467536016661';
      var apiVersion = 'v20.0';

      //Construct the API URL
      var url = `https://graph.facebook.com/${apiVersion}/${instagramAccountId}?fields=followers_count&access_token=${accessToken}`;

      //Make the API request
      var response = UrlFetchApp.fetch(url);
      var data = JSON.parse(response.getContentText());

      //Return the followers count
      return data.followers_count;
  }

  //Get the active spreadsheet
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FollowerData");

  //Get the current follower count
  var followerCount = getFollowersCount();

  //If the follower count is retrieved successfully, update the sheet
  if (followerCount !== null) {
    //Append a new row with current date and follower count
    sheet.appendRow([new Date().toLocaleDateString(), followerCount]);
    Logger.log("Updated follower count: " + followerCount);
  }
}
