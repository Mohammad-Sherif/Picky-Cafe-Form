function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  
  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getSheets()[0];
    
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var nextRow = sheet.getLastRow() + 1;
    
    var row = [];
    for (var i = 0; i < headers.length; i++) {
      if (headers[i] == 'Timestamp') {
        row.push(new Date());
      } else {
        var cellValue = e.parameter[headers[i]] || '';
        var strVal = String(cellValue);
        
        // تأمين الثغرة: لو الكلام بيبدأ بأي علامة رياضية، حط قبله ( ' )
        if (strVal.indexOf('=') === 0 || strVal.indexOf('+') === 0 || strVal.indexOf('-') === 0 || strVal.indexOf('@') === 0) {
          cellValue = "'" + strVal;
        }
        
        row.push(cellValue);
      }
    }
    
    sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}