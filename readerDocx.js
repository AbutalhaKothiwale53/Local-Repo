const fs = require('fs');
const mammoth = require('mammoth');
const express = require('express');


const app = express();
const port = 3002;


app.get('/', (req, res) => {
// Read the DOCX file
const docxFilePath = './assests/Question.docx'; // Replace with the path to your DOCX file
fs.readFile(docxFilePath, 'binary', (err, data) => {
    if (err) {
      res.send('Error reading the DOCX file: ' + err);
      return;
    }

    // Convert the DOCX to HTML
    mammoth.convertToHtml({ path: docxFilePath })
      .then((result) => {
        const htmlContent = result.value;
        // Display the HTML content in an HTML page
        const htmlPage = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>DOCX to HTML</title>
            </head>
            <body>
              ${htmlContent}
            </body>
          </html>
        `;

        res.send(htmlPage);
      })
      .catch((error) => {
        res.send('Error converting DOCX to HTML: ' + error);
      });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
