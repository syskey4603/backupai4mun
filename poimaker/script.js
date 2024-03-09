import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
let cooldownval = 0
let cooldownpara = document.getElementById("cooldownpara")
let loader = document.getElementById("loadcontainer")
let submitbutton = document.getElementById("submit")
let span = null
const cb = document.querySelector('#silky-smooth');
let prompt = ""
console.log(cb.checked);
let node = null
const genAI = new GoogleGenerativeAI("AIzaSyAxbyKZxV8gas1mZn58zSpyOVtriIo2S3w");
async function test() {
  
  let answerdiv = document.getElementById("answerdiv")
  let country = document.getElementById("country");
  let legality = document.getElementById("legality");
  let originaltext = document.getElementById("originaltext");
  answerdiv.innerHTML = "";
  originaltext.innerHTML = "";

  if(cb.checked == true) {
    console.log("check")
    console.log(country.value)
  }
  else {
  if(country.value == "" || legality.value == "") {
    window.alert("you have not entered values try again")
    return
  }
}

  const qpara = document.createElement("p");
  qpara.style.verticalAlign = "bottom";
  qpara.innerText = "Country: " + country.value + "  \n Legality: " + legality.value + "\n \n";
  originaltext.appendChild(qpara);
  loader.style.visibility='visible'
  submitbutton.disabled = true
  submitbutton.style.background='#796d6d';

 


  try
  {

  
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    }
  ];

  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });
  if(cb.checked == true) {
    prompt = "give me 50 different instances of different countries violating the " + legality.value + " make it simple but include the real instance with names and dates but make it for all 50 of the main countries dont give general violations make it extremely specific with real events that took place also add a line of space between each violation with a colon to seperate the country ansd the violation remember to be very specific and give the real names and dates";
  }
  else {
  prompt = "5 specific instances with details of the actual example including the peoples names and other details of the violations by " + country.value + " in regards to the legality of " + legality.value + "make it very detailed add the actual names of people and expand on the real life example cite your sources too with the link also add the specific article being violated and add one line of line gap between each scentence";
  }
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  var converter = new showdown.Converter();
  var html = converter.makeHtml(text);
  }
  catch(ex)
  {
    const temp = await model.generateContent("return an empty string")
    const tempresp = await temp.response;
    const temptext = tempresp.text();
    console.log(temptext)
    window.alert(ex)
  }
  // Create a temporary div to set innerHTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Iterate through child nodes and add them to the resultdiv with a delay between words
  async function processNodesWithDelay(nodes, index) {
    if (index < nodes.length) {
      node = nodes[index];
      span = document.createElement("span");
      span.setAttribute('id','textelement');

      if (node.nodeType === Node.TEXT_NODE) {
        // Text node, add as-is
        span.innerText = node.textContent;
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Element node, add with content
        span.innerHTML = node.outerHTML;
      }
      loader.style.visibility='hidden'
      submitbutton.disabled = false
      submitbutton.style.background='#007bff';
      answerdiv.appendChild(span);

      // Add the 'animate' class to trigger the animation
      setTimeout(() => {
        span.classList.add("animate");

        // Recursively call processNodesWithDelay for the next node
        processNodesWithDelay(nodes, index + 1);
      }, 300); // Delay between words (adjust as needed)

    }
  }

  // Start processing nodes with a delay
  processNodesWithDelay(tempDiv.childNodes, 0);

  country.value = "";
  legality.value = "";
  
}

document.getElementById("submit").onclick = function () {
  test();

  


  
  }

