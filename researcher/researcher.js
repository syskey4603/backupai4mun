import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
let cooldownval = 0
let cooldownpara = document.getElementById("cooldownpara")
let loader = document.getElementById("loadcontainer")
let submitbutton = document.getElementById("submit")
let span = null
let node = null
const genAI = new GoogleGenerativeAI("AIzaSyBBgo2dQo7OpMGXh3qLm49KlTAIUnyDYGo");
async function test() {
  
  let answerdiv = document.getElementById("answerdiv")
  let agenda = document.getElementById("agenda");
  let country = document.getElementById("country");
  let originaltext = document.getElementById("originaltext");
  answerdiv.innerHTML = "";
  originaltext.innerHTML = "";

  
  if(country.value == "" || agenda.value == "") {
    window.alert("you have not entered values try again")
    return
  }

  const qpara = document.createElement("p");
  qpara.style.verticalAlign = "bottom";
  qpara.innerText = "Country: " + country.value + "\n\n" + "Agenda: " + agenda.value + "\n"
  originaltext.appendChild(qpara);
  loader.style.visibility='visible'
  submitbutton.disabled = true
  submitbutton.style.background='#796d6d';

  const generationConfig = {
    maxOutputTokens: 2147483647,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
  };
  
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

  const model = genAI.getGenerativeModel({ model: "gemini-pro", generationConfig, safetySettings });

  const prompt = "imagine your the delegate of " + country.value + " in a MUN now you need to build comprehensive research on the agenda of " + agenda.value + " mostly focus on statistical and facts instead of opinions stuff your going to research on includes General Politics make sure to mention and be specific on head of state, Health Statistics be specific and descriptive military statistics, Legaslatives related to the agenda not just related to the country but the agenda at whole example the ICCPR,UDHR,GENEVA CONVENTIONS mention these please, detailed and specific solutions atleast 500 words for each solution for the agenda that the given country can implement, Research and basis of the agenda, Governmental Programs On The Agenda BE VERY SPECIFIC WE WANT NAMES STATISTICS AND EVERYTHING, Positive and negative things about that country on the given agenda, Controversial statements by your government on the given agenda, Pro statements by your government on the given agenda, Be SUPER SPECIFIC AND DESCRIPTIVE DO NOT SIMPLIFY and add one line of line gap between each scentenceand add one line of line gap between each scentence";
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  var converter = new showdown.Converter();
  var html = converter.makeHtml(text);

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
  agenda.value = "";
  
}

document.getElementById("submit").onclick = function () {
  test();

  


  
  }





