DBS10042 Examination Hub — Complete Google Sheets Setup

FILES
- index.html: English portal with student login popup, SI/SII sessions, logout button, questions and result slip.
- Code.gs: Google Apps Script endpoint for both login and exam-result data.
- assets/: images/diagrams included from the existing portal package.

WHAT IS SAVED
1. Every successful login submits Name, Student ID, Class, and timestamp to the "Login Data" tab.
2. Every exam result submission saves the student's details, session, score and answer details to the "Results" tab.
3. Both tabs are in a Google spreadsheet named "DBS10042 Exam Results" (created automatically if not found).

CRITICAL SETUP — THE SCRIPT MUST BE UPDATED TOO
The HTML cannot change the code already running on Google's servers. To save login details, you MUST replace the contents of Code.gs in the Apps Script project attached to this Web App URL with the Code.gs included in this package, then redeploy.

Web App URL used by index.html:
https://script.google.com/macros/s/AKfycbxHiPMSKN3Re3QZAvTj02QterMxHNP0T7BYzqiCewEztHsqzeR_gjqWblA7wCAqzVwP/exec

Steps:
1. Open the Apps Script project associated with the URL above.
2. Replace all code in Code.gs with the Code.gs supplied in this package.
3. Save.
4. Deploy > Manage deployments > Edit the existing Web App deployment.
5. Choose "New version", then Deploy. Prefer editing the existing deployment to keep the same /exec URL.
6. Set "Execute as" to "Me". Set access to the broadest option permitted by your institution (commonly "Anyone").
7. Complete the Google authorization prompts for Drive and Sheets.
8. Test by opening the deployed portal, entering Name / Student ID / Class, then check Google Drive for "DBS10042 Exam Results" > "Login Data".
9. Submit an examination result and check the "Results" tab.
10. If no rows appear, open Apps Script > Executions and inspect the latest failed execution.

NOTE ABOUT THE BROWSER
The portal uses fetch with mode "no-cors", so browser JavaScript cannot read the Apps Script response. The interface cannot conclusively verify that a row was written. Confirm by checking the spreadsheet and Apps Script Executions.

The script writes to Google Sheets, not directly to an .xlsx file. You can download the spreadsheet as Excel from Google Sheets if needed.
