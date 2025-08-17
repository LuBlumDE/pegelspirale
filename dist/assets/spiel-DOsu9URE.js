import"./style-DwoCqvni.js";function k(e){return Number.isNaN(e)?50:Math.min(100,Math.max(0,Math.floor(e)))}function y(){return Math.floor(Math.random()*100)+1}let g="under";function p(e){g=e,e=="over"?(l.classList.add("active"),c.classList.remove("active")):(c.classList.add("active"),l.classList.remove("active"))}function M(){return g}const r=document.getElementById("super"),o=document.getElementById("result"),h=document.getElementById("result-dialog"),d=document.getElementById("close-result"),i=document.getElementById("draw"),l=document.getElementById("range-over"),c=document.getElementById("range-under"),n=document.getElementById("super-display"),I=Array.from(document.querySelectorAll(".num-btn[data-num]")),m=document.getElementById("clear-super");function v(){n&&(r.value?(n.textContent=r.value,n.classList.add("filled")):(n.textContent="Superzahl eingeben",n.classList.remove("filled")))}function f(){n&&(n.classList.add("shake"),setTimeout(()=>n.classList.remove("shake"),300))}v();I.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.num??"",s=r.value;if(s.length===0){if(t==="0"){f();return}r.value=t}else if(s.length===1)r.value=s+t;else if(s.length===2)if(s==="10"&&t==="0")r.value=s+t;else{f();return}else return;v()})});m==null||m.addEventListener("click",()=>{r.value="",v()});l==null||l.addEventListener("click",()=>p("over"));c==null||c.addEventListener("click",()=>p("under"));d==null||d.addEventListener("click",()=>{h.close(),i.focus()});p("under");i==null||i.addEventListener("click",()=>{const e=k(Number(r.value)),t=y(),s=t>=51,E=t>=Math.max(1,e-2)&&t<=Math.min(100,e+2),u=M(),L=u==="over"&&s||u==="under"&&!s,a=`
      <h3 class="result-heading">Auswertung</h3>
      <pre class="result-line">Ergebnis &#9;&#9;&#9;${t}</pre>
      <div class="result-divider"></div>
      <pre class="result-line">Dein Tipp &#9;&#9;&#9;${u==="over"?"drüber":"drunter"}</pre>
      <pre class="result-line">Deine Superzahl &#9;&#9;${e}</pre>
    `;E?o.innerHTML=`
      ${a}
      <p class="super">EX EX EX leert eure Gläser!!!</p>
    `:L?o.innerHTML=`
      ${a}
      <p class="ok">korrekter Bereich, ein Schluck für die Verlierer</p>
    `:o.innerHTML=`
      ${a}
      <p class="bad">das war nichts, trink selbst</p>
    `,h.showModal()});