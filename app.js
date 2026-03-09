
const API="https://phi-lab-server.vercel.app/api/v1/lab/issues"

let allIssues=[]

async function loadIssues(){

document.getElementById("spinner").style.display="block"

const res=await fetch(API)
const data=await res.json()

allIssues=data.data

updateCounts()

displayIssues(allIssues)

document.getElementById("spinner").style.display="none"

}

function displayIssues(issues){

const container=document.getElementById("issuesContainer")

container.innerHTML=""

issues.forEach(issue=>{

const card=document.createElement("div")

card.className=`card ${issue.status}`

card.innerHTML=`

<div class="card-header">

<h3 class="issue-title">${issue.title}</h3>

<span class="status-badge ${issue.status}">
${issue.status}
</span>

</div>

<p class="issue-description">
${issue.description}
</p>

<div class="issue-middle">
<span>Priority: ${issue.priority}</span>
<span>${issue.label}</span>
</div>

<div class="issue-footer">
<span>${issue.author}</span>
<span>${issue.createdAt}</span>
</div>

`

card.onclick=()=>openModal(issue)

container.appendChild(card)

})

}

function filterIssues(type,event){

document.querySelectorAll(".tab").forEach(tab=>tab.classList.remove("active"))

event.target.classList.add("active")

if(type==="all"){
displayIssues(allIssues)
}

if(type==="open"){
displayIssues(allIssues.filter(i=>i.status==="open"))
}

if(type==="closed"){
displayIssues(allIssues.filter(i=>i.status==="closed"))
}

}

function updateCounts(){

document.getElementById("issueCount").innerText=allIssues.length+" Issues"

const open=allIssues.filter(i=>i.status==="open").length
const closed=allIssues.filter(i=>i.status==="closed").length

document.getElementById("openCount").innerText=open
document.getElementById("closedCount").innerText=closed

}

function openModal(issue){

const modal=document.getElementById("modal")

modal.style.display="flex"

modal.innerHTML=`

<div class="modal-content">

<h2>${issue.title}</h2>

<p>${issue.description}</p>

<p>Status: ${issue.status}</p>
<p>Author: ${issue.author}</p>
<p>Priority: ${issue.priority}</p>
<p>Label: ${issue.label}</p>
<p>Created: ${issue.createdAt}</p>

<button onclick="closeModal()">Close</button>

</div>

`

}

function closeModal(){
document.getElementById("modal").style.display="none"
}

async function searchIssues(){

const keyword=document.getElementById("searchInput").value

const res=await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${keyword}`
)

const data=await res.json()

displayIssues(data.data)

}

loadIssues()