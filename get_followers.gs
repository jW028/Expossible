function updateFollowerCount() {

  function getFollowersCount() {
    var accessToken = 'EAB4nW95kTowBO5mJWRGTMescZCtXcpebZCZBPMEKKNJ8VJmpcKs7PQtGY23CPSe9BA4MRzZBqLWd0UZBPoMjUDG01mA3lZAhZATtE5Tt8nrHeNBR8ZBDMZAc3mVmeWEE8c1NtHrEqBSa2qXZAZAarhk6teZC3ZCl8cQvSWT45GvpbEvyVZAoJgtRaj2pfkNFzW';

      var instagramAccountId = '17841467536016661';
      var apiVersion = 'v20.0';

      var url = `https://graph.facebook.com/${apiVersion}/${instagramAccountId}?fields=followers_count&access_token=${accessToken}`;

      var response = UrlFetchApp.fetch(url);
      var data = JSON.parse(response.getContentText());
      return data.followers_count;

  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("FollowerData");
  var followerCount = getFollowersCount();
  if (followerCount !== null) {
    sheet.appendRow([new Date().toLocaleDateString(), followerCount]);
    Logger.log("Updated follower count: " + followerCount);
  }
}
