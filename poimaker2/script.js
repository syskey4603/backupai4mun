const apiKey = "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"; 
const model = "llama3-8b-8192";

async function fetchViolations(country, agenda, freezeDate) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = "<p>Searching...</p>";

    let prompt = `Find specific violations with the names of people involved and dates or provide controversial government statements or legal cases the country lost, including customary international law violations related to "${agenda}".`;
    
    if (country) {
        prompt += ` for ${country}`;
    }
    
    if (freezeDate) {
        prompt += ` before ${freezeDate} do not give any information that happened after the date given `;
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: "You are a legal researcher." },
                    { role: "user", content: prompt }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        formatResponse(data.choices[0].message.content);
    } catch (error) {
        console.error("Error:", error);
        resultsElement.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
}

function formatResponse(response) {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = "";

    const lines = response.split("\n").filter(line => line.trim() !== "");

    let listOpen = false;

    lines.forEach(line => {
        if (line.match(/^\d+\./)) {
            const header = document.createElement("h3");
            header.innerHTML = line;
            resultsElement.appendChild(header);
        } else if (line.startsWith("*") || line.startsWith("+")) {
            if (!listOpen) {
                const ul = document.createElement("ul");
                resultsElement.appendChild(ul);
                listOpen = true;
            }
            const bullet = document.createElement("li");
            bullet.textContent = line.replace(/^[*+]\s*/, '');
            resultsElement.lastElementChild.appendChild(bullet);
        } else {
            const paragraph = document.createElement("p");
            paragraph.textContent = line;
            resultsElement.appendChild(paragraph);
            listOpen = false;
        }
    });
}

document.getElementById("query-form").addEventListener("submit", (event) => {
    event.preventDefault();
    
    const country = document.getElementById('country').value.trim();
    const agenda = document.getElementById('agenda').value.trim();
    const freezeDate = document.getElementById('freezeDate').value;

    if (!agenda) {
        alert("Please enter an agenda or legality to search for!");
        return;
    }

    fetchViolations(country, agenda, freezeDate);
});
