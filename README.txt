DBS10042 Engineering Science Examination Hub — Google Drive connected

The homepage has been configured with the Google Apps Script web app URL provided by the lecturer.

Important:
- This HTML sends result data to the configured Apps Script URL using a POST request.
- The frontend uses no-cors mode, so it cannot read the server response or guarantee that the save succeeded. Test by submitting one result and confirming a new file appears in the Google Drive folder.
- If the result does not appear, check that the Apps Script deployment is active, deployed as the correct account, has Drive permissions, and allows access appropriate for students.

Files:
- index.html: updated examination portal.
- Code.gs: Apps Script backend, if included in this package.
- README.txt: this guide.
