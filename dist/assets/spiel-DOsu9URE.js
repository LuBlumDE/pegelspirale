import"./style-C5m2fqyP.js";function k(e){return Number.isNaN(e)?50:Math.min(100,Math.max(0,Math.floor(e)))}function y(){return Math.floor(Math.random()*102)}let f="under";function v(e){f=e,e=="over"?(a.classList.add("active"),l.classList.remove("active")):(l.classList.add("active"),a.classList.remove("active"))}function b(){return f}const r=document.getElementById("super"),d=document.getElementById("result"),h=document.getElementById("result-dialog"),o=document.getElementById("close-result"),c=document.getElementById("draw"),a=document.getElementById("range-over"),l=document.getElementById("range-under"),n=document.getElementById("super-display"),M=Array.from(document.querySelectorAll(".num-btn[data-num]")),m=document.getElementById("clear-super");function p(){n&&(r.value?(n.textContent=r.value,n.classList.add("filled")):(n.textContent="Superzahl eingeben",n.classList.remove("filled")))}function g(){n&&(n.classList.add("shake"),setTimeout(()=>n.classList.remove("shake"),300))}p();M.forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.num??"",t=r.value;if(t.length===0){if(s==="0"){g();return}r.value=s}else if(t.length===1)r.value=t+s;else if(t.length===2)if(t==="10"&&s==="0")r.value=t+s;else{g();return}else return;p()})});m==null||m.addEventListener("click",()=>{r.value="",p()});a==null||a.addEventListener("click",()=>v("over"));l==null||l.addEventListener("click",()=>v("under"));o==null||o.addEventListener("click",()=>{h.close(),c.focus()});v("under");c==null||c.addEventListener("click",()=>{const e=k(Number(r.value)),s=y(),t=s>=51,E=s>=Math.max(0,e-2)&&s<=Math.min(101,e+2),i=b(),L=i==="over"&&t||i==="under"&&!t,u=`
      <div class="result-line"><span class="badge">Zahl</span>${s}</div>
      <div class="result-line"><span class="badge">Bereich</span>${t?"drüber":"drunter"}</div>
      <div class="result-line"><span class="badge">Dein Tipp</span>${i==="over"?"drüber":"drunter"}</div>
      <div class="result-line"><span class="badge">Superzahl</span>${e}</div>
    `;E?d.innerHTML=`
      ${u}
      <p class="super">EX EX EX leert eure Gläser</p>
    `:L?d.innerHTML=`
      ${u}
      <p class="ok">korrekter Bereich, ein Schluck für die Verlierer</p>
    `:d.innerHTML=`
      ${u}
      <p class="bad">das war nichts, trink selbst</p>
    `,h.showModal()});