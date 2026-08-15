const teams=[
 {name:"Yomuri Giants",abbr:"YG",gp:2,w:1,l:1,d:0,r:6,ra:1,streak:"W1",l10:"1-1"},
 {name:"Kiwoom Heros",abbr:"KH",gp:2,w:1,l:1,d:0,r:1,ra:6,streak:"L1",l10:"1-1"}
];
const seasonGames=30;
const navBtns=document.querySelectorAll(".nav-btn");
const pages=document.querySelectorAll(".page");

function showPage(id){
 pages.forEach(p=>p.classList.toggle("active",p.id===id));
 navBtns.forEach(b=>b.classList.toggle("active",b.dataset.page===id));
 window.scrollTo({top:0,behavior:"smooth"});
}
navBtns.forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.page)));
document.querySelectorAll("[data-jump]").forEach(b=>b.addEventListener("click",()=>showPage(b.dataset.jump)));

function pct(t){return (t.gp?t.w/t.gp:0).toFixed(3).replace(/^0/,"")}
function rd(t){return t.r-t.ra}
function gb(t,leader){return ((leader.w-t.w)+(t.l-leader.l))/2}
function magicNumber(index){
 if(index===0)return "—";
 const leader=teams[0];
 const t=teams[index];
 return Math.max(0,(seasonGames-t.gp)+t.l+1-leader.w);
}
function renderStandings(){
 teams.sort((a,b)=>(b.w/b.gp)-(a.w/a.gp)||rd(b)-rd(a));
 const body=document.querySelector("#standingsTable tbody");
 body.innerHTML=teams.map((t,i)=>`<tr>
 <td>${i+1}</td><td class="left"><b>${t.name}</b></td><td>${t.gp}</td><td>${t.w}</td><td>${t.l}</td><td>${t.d}</td>
 <td>${pct(t)}</td><td>${i===0?"—":gb(t,teams[0]).toFixed(1)}</td><td>${t.r}</td><td>${t.ra}</td><td>${rd(t)>0?"+":""}${rd(t)}</td>
 <td>${t.streak}</td><td>${magicNumber(i)}</td><td>${t.l10}</td></tr>`).join("");
 document.querySelector("#leaderName").textContent=teams[0].name;
 document.querySelector("#leaderRecord").textContent=`${teams[0].w} - ${teams[0].l}`;
 document.querySelector("#gamesPlayed").textContent=teams[0].gp;
}
function renderTeams(){
 document.querySelector("#teamGrid").innerHTML=teams.map(t=>`<div class="team"><div class="logo">${t.abbr}</div><div><h3>${t.name}</h3><p>${t.w}-${t.l} · ${pct(t)} WIN PCT</p></div></div>`).join("");
}
function renderSchedule(){
 document.querySelector("#scheduleList").innerHTML=[
  ["AUG 14, 2026","Yomuri Giants  vs  Kiwoom Heros","FINAL · 6 - 0"],
  ["AUG 15, 2026","Kiwoom Heros  vs  Yomuri Giants","FINAL · 1 - 0"],
  ["AUG 16, 2026","Yomuri Giants  vs  Kiwoom Heros","15:00 KST"],
  ["AUG 17, 2026","            OFF DAY            "],
  ["AUG 18, 2026","Yomuri Giants  vs  Kiwoom Heros","20:00 KST"]
 ].map(g=>`<div class="game"><div class="game-date">${g[0]}</div><div class="game-teams">${g[1]}</div><div class="game-result">${g[2]}</div></div>`).join("");
}
function renderStats(){
 const leader=teams[0];
 const bestRD=[...teams].sort((a,b)=>rd(b)-rd(a))[0];
 document.querySelector("#statsGrid").innerHTML=[
  ["WINNING PERCENTAGE",pct(leader)],
  ["MOST RUNS",Math.max(...teams.map(t=>t.r))],
  ["BEST RUN DIFFERENTIAL",`${rd(bestRD)>0?"+":""}${rd(bestRD)}`],
  ["TOTAL GAMES PLAYED",teams.reduce((s,t)=>s+t.gp,0)/2]
 ].map(x=>`<div class="stat"><h3>${x[0]}</h3><div class="big">${x[1]}</div></div>`).join("");
}
renderStandings();renderTeams();renderSchedule();renderStats();
