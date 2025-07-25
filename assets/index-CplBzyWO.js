(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const P=(t,a)=>({getMark:()=>a,getName:()=>t}),p=(()=>{const t=Array(9).fill("");return{getBoard:()=>[...t],placeMark:(c,y)=>t[c]===""?(t[c]=y,!0):!1,isFull:()=>t.every(c=>c!==""),reset:()=>t.fill(""),print:()=>console.log(t)}})(),m=(()=>{let t,a,n,o=!1,e={player1:0,player2:0,draws:0};const r=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]],c=(f="Player 1",u="Player 2")=>{t=P(f,"X"),a=P(u,"0"),n=t,o=!1,p.reset()},y=()=>n,b=()=>e,l=()=>({player1:t,player2:a}),i=()=>{const f=p.getBoard();for(const u of r)if(u.every(E=>f[E]===n.getMark()))return u;return null},d=()=>{n=n===t?a:t};return{startGame:c,playTurn:f=>{if(o||!p.placeMark(f,n.getMark()))return;const u=i();return u?(o=!0,n===t?e.player1+=1:e.player2+=1,{message:`${n.getName()} wins!`,combo:u}):p.isFull()?(o=!0,e.draws+=1,{message:"It's a draw!"}):(d(),null)},getCurrentPlayer:y,isGameOver:()=>o,restart:()=>{p.reset(),n=t,o=!1},getScores:b,getPlayers:l}})();(()=>{const t=document.getElementById("app");let a=0,n=0;const o=()=>{t.innerHTML=`
      <h1>Tic Tac Toe</h1>
      
      <div class="scoreboard">
        <p><span id="score-p1-name">Player 1</span>: <span id="score-p1">0</span></p>
        <p><span id="score-p2-name">Player 2</span>: <span id="score-p2">0</span></p>
      </div>
      
      <div class="board" id="board"></div>
      <div id="status" class="status"></div>
      
      <div class="inputs">
        <input type="text" id="player1" placeholder="Player 1 name" />
        <input type="text" id="player2" placeholder="Player 2 name" />
      </div>
      
      <div class="buttons">
        <button id="start">Start Game</button>
        <button id="reset">Reset</button>
      </div>
    `},e=l=>{const i=parseInt(l.target.dataset.index),d=m.playTurn(i);r();const g=document.getElementById("status");if(d){g.textContent=d.message,d.combo&&d.combo.forEach(v=>{document.querySelector(`[data-index='${v}']`).classList.add("winner")});const s=m.getCurrentPlayer();s.getMark()==="X"?a++:s.getMark()==="O"&&n++,b()}else{const s=m.getCurrentPlayer();g.textContent=`${s.getName()}'s turn (${s.getMark()})`}},r=()=>{const l=p.getBoard(),i=document.getElementById("board");i.innerHTML="",l.forEach((d,g)=>{const s=document.createElement("div");s.classList.add("cell"),s.textContent=d,s.dataset.index=g,d==="X"&&s.classList.add("x-cell"),d==="O"&&s.classList.add("o-cell"),s.addEventListener("click",e),i.appendChild(s)})},c=()=>{const l=document.getElementById("player1").value||"Player 1",i=document.getElementById("player2").value||"Player 2";document.getElementById("score-p1-name").textContent=l,document.getElementById("score-p2-name").textContent=i,m.startGame(l,i),r(),document.getElementById("status").textContent=`${l}'s turn (X)`},y=()=>{m.restart(),r();const l=m.getCurrentPlayer();document.getElementById("status").textContent=`${l.getName()}'s turn (${l.getMark()})`},b=()=>{document.getElementById("score-p1").textContent=a,document.getElementById("score-p2").textContent=n};o(),m.startGame("Player 1","Player 2"),r(),document.getElementById("status").textContent="Player 1's turn (X)",document.getElementById("start").addEventListener("click",c),document.getElementById("reset").addEventListener("click",y)})();
