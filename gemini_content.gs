// Function to generate content using the Gemini API
function generateContentFromGemini() {
  // API details
  var apiKey = "AIzaSyASPa48hy6XtE-VwpYtfmYBDf2x4gVVp0U"; 
  var apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"; 
  var url = apiUrl + "?key=" + apiKey;

  // Set up request headers and body
  var headers = {
    "Content-Type": "application/json"
  };
  var requestBody = {
    "contents": [
      {
        "parts": [
          {
            "text": "Generate the text for an instagram post for a small software house (Expossible) and don't repeat with previous posts" 
          }
        ]
      }
    ]
  };

  // Make API request
  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(requestBody)
  };

  //Handle response
  try {
    var response = UrlFetchApp.fetch(url, options);
    var data = JSON.parse(response.getContentText());

    var output = data.candidates[0].content.parts[0].text;
    Logger.log(output);

    return output;

  } catch (e) {
    Logger.log('Error: ' + e.toString());
  }
}

// Function to update a spreadsheet with generated content
function updateTemplateSheet() {

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("ContentTemplates");

  var content = generateContentFromGemini();
  var title = generateTitle(content);

  try {
    sheet.appendRow([title, content]);
  } catch (e) {
    Logger.log('Error: ' + e.toString());
  }
} 

// Function to generate a title from the generated content
function generateTitle(prompt) {

  var apiKey = "AIzaSyASPa48hy6XtE-VwpYtfmYBDf2x4gVVp0U"; 
  var apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent"; 
  var url = apiUrl + "?key=" + apiKey;

  var headers = {
    "Content-Type": "application/json"
  };

  var requestBody = {
    "contents": [
      {
        "parts": [
          {
            "text": "Generate only one concise title for this post and relate it to the theme of the post" + prompt
          }
        ]
      }
    ]
  };

  var options = {
    "method": "POST",
    "headers": headers,
    "payload": JSON.stringify(requestBody)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var data = JSON.parse(response.getContentText());

    var output = data.candidates[0].content.parts[0].text;
    Logger.log(output);

    return output;

  } catch (e) {
    Logger.log('Error: ' + e.toString());
  }
}


