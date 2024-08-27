import { GoogleGenerativeAI } from "@google/generative-ai";
import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";

let loader = document.getElementById("loadcontainer")
let submitbutton = document.getElementById("submit")

let prompt = ""
var jsonText;
var globalData;
const genAI = new GoogleGenerativeAI("AIzaSyCHSuFua2sPggTV5uHe_62RcfKYgq-uZtE");
var coll = document.getElementsByClassName("collapsible");
var coll1 = document.getElementById("collapsible1")
var details1 = document.getElementById("details1");
var coll2 = document.getElementById("collapsible2")
var details2 = document.getElementById("details2");
var coll3 = document.getElementById("collapsible3")
var details3 = document.getElementById("details3");
var coll4 = document.getElementById("collapsible4")
var details4 = document.getElementById("details4");
var coll5 = document.getElementById("collapsible5")
var details5 = document.getElementById("details5");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

async function fetchData() {
  try {
      const response = await fetch('jsontext.json');
      const json = await response.json();
      globalData = json;
      console.log(globalData)
  } catch (error) {
      console.error('Error fetching JSON:', error);
  }
}

await fetchData()

//console.log(globalData["violations"][0])

async function test() {
  
  let answerdiv = document.getElementById("answerdiv")
  let query = document.getElementById("query");
  console.log(query.value)
  loader.style.visibility='visible'
  submitbutton.disabled = true
  submitbutton.style.background='#796d6d';
  answerdiv.innerHTML = "";
 


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

  const model = genAI.getGenerativeModel({ model: "gemini-pro", safetySettings});
  prompt = "5 specific instances with details of the actual example including the peoples names and other details of the violations by china in regards to the legality of the geneva or vienna conventions the violations have to be by the countries government breaking international law make it very detailed add the actual names of people remember to get real names and events cite your sources too with the link also add the specific article of which legality remember to state both article and what legeslative its from and add the date of the violations and give all of it as a json only return the json including sources and any other information the article violated field named as article keep the legaslative and which article in the same field named article the date as date the source as source and include the names remember to add specific peoples names and real events to back up the violations and other details make it detailed and descriptive of the events in the parameter details keep it the same parameters everytime"
  const result = await model.generateContent(prompt);
  const response = await result.response;
  let text = response.text();
  if(text.startsWith("```json")) {
    jsonText = text.substring(7, text.length - 1);
    text =  text.substring(7, text.length - 1);
  }
  if(text.endsWith("```")) {
    jsonText = text.substring(0, text.length - 3);
    text = text.substring(0, text.length - 3);
  }
  if(text.endsWith("``")) {
    jsonText = text.substring(0, text.length - 2);
    text = text.substring(0, text.length - 2);
  }
  console.log(text)
  jsonText = JSON.parse(text);
  console.log(jsonText["violations"][0]["article"])
  loader.innerHTML = ""
  coll1.textContent = jsonText["violations"][0]["article"] + "          Date: " + jsonText["violations"][0]["date"]
  details1.textContent = jsonText["violations"][0]["details"]
  coll2.textContent = jsonText["violations"][1]["article"] + "          Date: " + jsonText["violations"][1]["date"]
  details2.textContent = jsonText["violations"][1]["details"]
  coll3.textContent = jsonText["violations"][2]["article"] + "          Date: " + jsonText["violations"][2]["date"]
  details3.textContent = jsonText["violations"][2]["details"]
  coll4.textContent = jsonText["violations"][3]["article"] + "          Date: " + jsonText["violations"][3]["date"]
  details4.textContent = jsonText["violations"][3]["details"]
  coll5.textContent = jsonText["violations"][4]["article"] + "          Date: " + jsonText["violations"][4]["date"]
  details5.textContent = jsonText["violations"][4]["details"]
  //answerdiv.innerText = jsonText["violations"][0]["source"];
  }
  catch(ex)
  {
    window.alert(ex)
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
    const temp = await model.generateContent("return an empty string")
    const tempresp = await temp.response;
    const temptext = tempresp.text();
    console.log(temptext)
    window.alert(ex)
  }
  console.log(answerdiv.innerText)
}

document.getElementById("submit").onclick = function () {
  test();
  
  }
