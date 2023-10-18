
const venom = require('venom-bot');
const express = require('express');
const app = express();

function start(client) {
  const buttons = [
    {
      "buttonText": {
        "displayText": "Battery Replacement"
      }
    },
    {
      "buttonText": {
        "displayText": "Battery Prices"
      }
    },
    {
      "buttonText": {
        "displayText": "Assistance"
      }
    }
  ]
  client.sendButtons("923122975086@c.us", "Services", buttons, "List of services we are offering")
    .then((result) => {
      console.log('Result: ', result); //return object success
      client.onMessage(async (message) => {
        if (message.body === 'Battery Replacement' && message.isGroupMsg === false) {
          client
            .sendText(message.from, 'Send your current location')
            .then((result) => {
              console.log('Result: ', result); //return object success

            })
            .catch((erro) => {
              console.error('Error when sending: ', erro); //return object error
            });
        }
        if (message.body === 'Battery Prices') {
          client.sendText(message.from, 'battery prices').then((result) => {
            console.log('result')
          }).catch((e) => {
            console.log(e.message);
          })
        }
        if (message.body === 'Assistance') {
          client.sendText(message.from, 'okay talk to me').then((result) => {
            console.log('result', result?.status?.messageSendResult);
          }).catch((e) => {
            console.log(e.message);
          })
        }

      });
    })
    .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });

}

function handleQRCode(base64Qrimg, asciiQR, attempts, urlCode, res) {
  const html = `
      <!DOCTYPE html>
      <html>
      <head>
      <title>QR Code</title>
      </head>
      <body>
      
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAEICAYAAACj9mr/AAAAAXNSR0IArs4c6QAAHStJREFUeF7t3dGRJEeOBNCiCjw9uMbVX4Y1W0FOhr7fIzvG7JHujKzp9vkcQwQAh8MDkV2V9cuvv/3+8XqDf//73/98iuJ//vXvT/+ndqeUdG1id/J7ykPjS/Z7ykfiV6nYxvSd/GpuGnNi98sE4u+L0ElIkoZu75c0apukmpuSWeP7Gf1qbopVYjeBCKYUJZ8WvL3fBOL1Uky1idq1TA4UjTmxm0BMII780UZQ8v2MjZo0b5JvG3ut0cnuk0AkiWkg+mxB90sKqadsEnNS8KQeGrPGp89mFFOtbzs+xfQGfspdjVkxVb8TiANS2ghaNCX4jcbS3DQWzU2xUuIm8WksE4jXawIxgXglTZ6s1dMu8aFNrsLUFtjEr+KndiesJhATiAnEDzpIxSURsAnEAQEFXpVPQdb99JRIRtUkFl2rOCcET9YmeeyKoei53d+eIJQE7aKpX23UREieEg31q9g7XT5btuuh+yUxK34Jh5RX6qMt7MqNCQROMwmgCQkSv7o2aTZt6DYGScwTiDN6igs9g1BiKEnbCqmEVKVv53HDr8acNJvyQOuh+yUxayNozBqLcly5oXlofLrfBOLwQSlttjYJEr+6VgmkxE38TiDO1VBeJfhNILATFGQFVE+itt+kURGq6K8dieBofIqBNmDiN/Gha5VDCS5fYoJIAGivVVLdEBz1kWCggqi4qF3SHJpvImqKfdtO8VO/E4gDogqeFkMJqSeHEjfJQ9dOIM4sSPBTHiQiqfFNICYQR4YrgSYQEwi+e7ZPyhsKmcS8CaL/dWrFNOGG1lwnNd0vmQxUsBU/3W8TxCaITRAvFzoVJm3Att0EAhtagXqnU0Jj1rFeyax+9aRMMFUfehprLO1G1Rq149Naar5fYoJIiqEFahM3aV7NN/GREC3BtI2zxqINk9gppip+SX01jwnEoWoKvIKsdkqgCcTr+FwswUVrlNhpfScQwWve9ITRYugJo36fKm6SR4JV0pTqt92USY3asWjd1G8b000QmyCUU0e7CUQ2zXwJgYgYhA2YEC1RV12r8WnB25g+lYfiklzbEkwTXDRmnS615jrh6H5qd/JLE4Q6ULsEAF2rxU0IlOSra9XuqTwmEOcKKS4qfsl+yqEJxAGppxpLi6Z2T+WhxE0EW5tIT/L2IaN+tZYan+6ndhOICUT0QzIJcScQ2qb9ZxrqeQIxgZhAvLwBVdS+1QShatO2S0ZkPdlmd/5I8XB5f1za/ab7fdmf3pvgZCfl8Hsv/LSh23YTiP/+5xOmO1Hf/0T9bgLWbnzdbwIxge">
<img src="${base64Qrimg}">
    </body>
    </html>
`;

  // Set the content type to HTML
  res.setHeader('Content-Type', 'text/html');

  // Send the HTML res
  res.send(html)


}

// <!DOCTYPE html>
// <html>
// <head>
// <!-- Your HTML header content here -->
// </head>
// <body>
// <h1>hello</h1>

// <img src="data:image/png;base64,${base64Qrimg}" alt="QR Code" width="200" height="200">


//   </body>
//   </html>
// `;

// // Send the HTML template to the client
// res.send(htmlTemplate);
app.get('/qr', (req, res) => {
  venom
    .create({
      session: './tokens/faaiz', // Path to your session data
      catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
        // Call the custom handleQRCode function
        handleQRCode(base64Qrimg, asciiQR, attempts, urlCode, res);
      }

    })
    .then((client) => start(client))
    .catch((erro) => {
      console.log(erro.message);
    });

});

app.listen(5000, () => {
  console.log(`http://localhost:5000`)

})

