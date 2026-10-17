/**
 * DBS10042 Examination Hub - Google Sheets receiver
 * Handles both student login records and examination result submissions.
 *
 * IMPORTANT: After replacing this file in Apps Script, deploy a NEW VERSION
 * of the existing Web App deployment. Keep the same /exec URL if editing the
 * existing deployment.
 */

const SPREADSHEET_NAME = "DBS10042 Exam Results";
const LOGIN_SHEET_NAME = "Login Data";
const RESULTS_SHEET_NAME = "Results";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      throw new Error("No submission payload received.");
    }

    const payload = JSON.parse(e.postData.contents);
    const spreadsheet = getOrCreateSpreadsheet_(SPREADSHEET_NAME);
    const type = String(payload.type || "result").toLowerCase();

    if (type === "login") {
      const loginSheet = getOrCreateSheet_(
        spreadsheet,
        LOGIN_SHEET_NAME,
        ["Timestamp", "Name", "Student ID", "Class"]
      );
      loginSheet.appendRow([
        payload.timestamp || new Date().toISOString(),
        payload.studentName || payload.name || "",
        payload.studentId || "",
        payload.studentClass || payload.class || ""
      ]);
      return jsonResponse_({ok: true, type: "login", message: "Student login saved."});
    }

    const resultsSheet = getOrCreateSheet_(
      spreadsheet,
      RESULTS_SHEET_NAME,
      [
        "Timestamp", "Session", "Name", "Student ID", "Class",
        "Total Questions", "Gradable Questions", "Correct",
        "Incorrect / Unanswered", "Score (%)", "Answers JSON"
      ]
    );
    resultsSheet.appendRow([
      payload.timestamp || new Date().toISOString(),
      payload.sessionTitle || payload.session || "",
      payload.studentName || payload.name || "",
      payload.studentId || "",
      payload.studentClass || payload.class || "",
      payload.totalQuestions ?? "",
      payload.gradableQuestions ?? "",
      payload.correct ?? "",
      payload.incorrectOrUnanswered ?? "",
      payload.scorePercent ?? "",
      JSON.stringify(payload.answers || [])
    ]);
    return jsonResponse_({ok: true, type: "result", message: "Examination result saved."});
  } catch (err) {
    console.error(err && err.stack ? err.stack : err);
    return jsonResponse_({
      ok: false,
      error: String(err && err.message ? err.message : err)
    });
  }
}

function doGet() {
  return ContentService.createTextOutput(
    "DBS10042 Google Sheets endpoint is ready. POST login and result data to save records."
  );
}

function getOrCreateSpreadsheet_(name) {
  const files = DriveApp.getFilesByName(name);
  while (files.hasNext()) {
    const file = files.next();
    if (file.getMimeType() === MimeType.GOOGLE_SHEETS) {
      return SpreadsheetApp.openById(file.getId());
    }
  }
  return SpreadsheetApp.create(name);
}

function getOrCreateSheet_(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
  }
  return sheet;
}

function jsonResponse_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
