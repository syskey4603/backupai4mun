import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
let cooldownval = 0
let cooldownpara = document.getElementById("cooldownpara")
let loader = document.getElementById("loadcontainer")
let submitbutton = document.getElementById("submit")
let span = null
let node = null
const genAI = new GoogleGenerativeAI("AIzaSyAxbyKZxV8gas1mZn58zSpyOVtriIo2S3w");
async function test() {
  
  let answerdiv = document.getElementById("answerdiv")
  let POI = document.getElementById("POI");
  let country = document.getElementById("country");
  let originaltext = document.getElementById("originaltext");
  answerdiv.innerHTML = "";
  originaltext.innerHTML = "";

  
  if(country.value == "" || POI.value == "") {
    window.alert("you have not entered values try again")
    return
  }

  const qpara = document.createElement("p");
  qpara.style.verticalAlign = "bottom";
  qpara.innerText = "Country: " + country.value + "\n\n" + "POI: " + POI.value + "\n"
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
    }
  ];

  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings });

  const prompt = "imagine your the delegate of " + country.value + " in a UN conference and you are asked a POI defend your country without apologizing or incriminating yourself you must use facts and logic to combat the question you cannot show your countries weakness and do not aknowledge the existance of countries you do not admit are real for example china cannot admit taiwan exists nor can russia for ukraine or incompetance also do not add an intro or conclusion or a thank you simply answer the question the question is " + POI.value + "now answer it following the instructions and add one line of line gap between each scentence";
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
  POI.value = "";
  
}

document.getElementById("submit").onclick = function () {
  test();

  


  
  }






