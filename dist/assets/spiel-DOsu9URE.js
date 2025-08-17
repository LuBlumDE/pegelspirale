import"./style-DfHvWPWK.js";function k(e){return Number.isNaN(e)?50:Math.min(100,Math.max(0,Math.floor(e)))}function y(){return Math.floor(Math.random()*102)}let f="under";function p(e){f=e,e=="over"?(l.classList.add("active"),c.classList.remove("active")):(c.classList.add("active"),l.classList.remove("active"))}function M(){return f}const r=document.getElementById("super"),o=document.getElementById("result"),h=document.getElementById("result-dialog"),d=document.getElementById("close-result"),u=document.getElementById("draw"),l=document.getElementById("range-over"),c=document.getElementById("range-under"),n=document.getElementById("super-display"),I=Array.from(document.querySelectorAll(".num-btn[data-num]")),m=document.getElementById("clear-super");function g(){n&&(r.value?(n.textContent=r.value,n.classList.add("filled")):(n.textContent="Superzahl eingeben",n.classList.remove("filled")))}function v(){n&&(n.classList.add("shake"),setTimeout(()=>n.classList.remove("shake"),300))}g();I.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.num??"",s=r.value;if(s.length===0){if(t==="0"){v();return}r.value=t}else if(s.length===1)r.value=s+t;else if(s.length===2)if(s==="10"&&t==="0")r.value=s+t;else{v();return}else return;g()})});m==null||m.addEventListener("click",()=>{r.value="",g()});l==null||l.addEventListener("click",()=>p("over"));c==null||c.addEventListener("click",()=>p("under"));d==null||d.addEventListener("click",()=>{h.close(),u.focus()});p("under");u==null||u.addEventListener("click",()=>{const e=k(Number(r.value)),t=y(),s=t>=51,E=t>=Math.max(0,e-2)&&t<=Math.min(101,e+2),a=M(),L=a==="over"&&s||a==="under"&&!s,i=`
      <h3 class="result-heading">Auswertung</h3>
      <pre class="result-line">Ergebnis&#9;&#9;&#9;${t}</pre>
      <pre class="result-line">Bereich&#9;&#9;&#9;${s?"drüber":"drunter"}</pre>
      <pre class="result-line">Dein Tipp&#9;&#9;${a==="over"?"drüber":"drunter"}</pre>
      <pre class="result-line">Deine Superzahl&#9;&#9;&#9;${e}</pre>
    `;E?o.innerHTML=`
      ${i}
      <p class="super">EX EX EX leert eure Gläser</p>
    `:L?o.innerHTML=`
      ${i}
      <p class="ok">korrekter Bereich, ein Schluck für die Verlierer</p>
    `:o.innerHTML=`
      ${i}
      <p class="bad">das war nichts, trink selbst</p>
    `,h.showModal()});