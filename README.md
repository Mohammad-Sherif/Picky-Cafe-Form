# Picky Cafe - Feedback System

A lightweight, responsive, and serverless feedback collection system designed for cafes and restaurants. This project uses a static HTML/CSS/JS frontend hosted on GitHub Pages and a Google Sheets backend via Google Apps Script to store feedback automatically.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?style=for-the-badge&logo=google&logoColor=white)

## Key Features & Engineering Solutions

- **Serverless Architecture:** Decoupled front-end hosted on GitHub Pages, connected seamlessly to a private Google Apps Script backend. No traditional backend hosting required.
- **Cross-Browser Reliability:** Engineered a hidden `iframe` form submission system to bypass strict iOS Safari Intelligent Tracking Prevention (ITP) and Ad-Blockers, guaranteeing instant data dispatch and reducing request latency.
- **Security-First Approach:** Implemented front-end payload sanitization to prevent Google Sheets Formula Injection (filtering out `=`, `+`, `-`, `@` executions) and strictly preserving data formatting (e.g., leading zeros in phone numbers).
- **Bilingual UI (En/Ar):** Custom dictionary system avoiding third-party browser auto-translation bugs, featuring seamless RTL/LTR layout and typography transitions.
- **Mobile-Optimized Design:** Fully responsive layout constructed with custom breakpoints to prevent horizontal scrolling and ensure a native-app feel on mobile screens.

## Developed By
**Mohammad Sherif**
- **GitHub:** [@mohammad-sherif](https://github.com/mohammad-sherif)

---

## Step 1: Google Sheets Setup (The Database)
To catch the feedback data, you need to set up a Google Sheet.

1. Create a new Google Spreadsheet and name it (e.g., `Picky Feedback`).
2. **Crucial:** In the very first row (**Row 1**), paste the following exact column headers. *Note: They must match the `name` attributes in the HTML form exactly.*

| A | B | C | D | E | F | G | H | I | J | K | L | M | N | O | P |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | source | source_other | customer_name | phone_number | email | drink_ordered | rate_taste | rate_quality | rate_freshness | rate_presentation | rate_packaging | rate_staff | rate_speed | rate_overall | feedback_notes |

*(Delete any empty rows above the headers if they exist, Row 1 must contain these exact words).*

---

## Step 2: Google Apps Script Setup (The Backend)
We use Google Apps Script as the bridge between the website and the Google Sheet.

1. Open your Google Sheet, click on **Extensions** > **Apps Script**.
2. Delete any default code in the editor.
3. Open the provided standalone Script file, copy its entire contents, and paste it into the editor.
4. Save the project (click the floppy disk icon).
5. **Deploy the Script:**
   - Click **Deploy** > **New deployment** at the top right.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Under "Execute as", select: **Me**.
   - Under "Who has access", select: **Anyone**.
   - Click **Deploy** and authorize the necessary Google permissions.
   - Copy the generated **Web app URL**.

---

## Step 3: Link the Frontend
1. Open your `index.html` file.
2. Scroll down to the `<script>` section at the bottom.
3. Replace the `scriptURL` variable with the Web App URL you copied from Step 2:
`const scriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`

---

## Common Issues & Troubleshooting

**If the form submits successfully but no data appears in the Google Sheet:**
* **Try 1:** Check your Google Sheet. Ensure your headers are strictly located in **Row 1**. If there are empty rows or letters above your headers, delete those rows completely.
* **Try 2:** Double-check your `index.html` file. Ensure the `scriptURL` is pasted correctly and matches the active deployment URL of your Apps Script.

**If the Timestamp column shows the wrong time (e.g., US time instead of your local time):**
* **Try 1:** Open the Google Sheet, go to `File` > `Settings`, and change the "Time zone" to your local timezone, then save.
* **Try 2:** Open the Apps Script editor, click the Gear icon (Project Settings) on the left menu, and ensure the "Time zone" there matches your local timezone as well.

**If you updated your HTML/CSS code but the live link still shows the old version:**
* **Try 1:** This is mostly caused by browser or GitHub CDN caching. Open your website link in an **Incognito/Private Window**.
* **Try 2:** Add a version query parameter to the end of your URL to force a hard refresh (e.g., change `https://your-username.github.io/` to `https://your-username.github.io/?v=1` or `?v=2`).

**If the code injection protection isn't working (e.g., `=1+1` calculates to `2` in the sheet):**
* **Try 1:** Ensure you are using the latest version of the `index.html` file where the JavaScript `FormData` sanitation loop is implemented.
* **Try 2:** If you modified the Apps Script backend, make sure you created a **New version** when deploying (`Manage deployments` > `Edit` > `Version: New version`). Simply saving the code without creating a new version deployment will not update the live Web App.
