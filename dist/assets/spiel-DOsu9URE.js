import"./style-DMXaC8ee.js";function y(e){return Number.isNaN(e)?50:Math.min(100,Math.max(0,Math.floor(e)))}function k(){return Math.floor(Math.random()*102)}let g="under";function m(e){g=e,e=="over"?(l.classList.add("active"),c.classList.remove("active")):(c.classList.add("active"),l.classList.remove("active"))}function M(){return g}const r=document.getElementById("super"),u=document.getElementById("result"),h=document.getElementById("result-dialog"),o=document.getElementById("close-result"),a=document.getElementById("draw"),l=document.getElementById("range-over"),c=document.getElementById("range-under"),s=document.getElementById("super-display"),I=Array.from(document.querySelectorAll(".num-btn[data-num]")),d=document.getElementById("clear-super");function v(){s&&(r.value?(s.textContent=r.value,s.classList.add("filled")):(s.textContent="Superzahl eingeben",s.classList.remove("filled")))}function p(){s&&(s.classList.add("shake"),setTimeout(()=>s.classList.remove("shake"),300))}v();I.forEach(e=>{e.addEventListener("click",()=>{const t=e.dataset.num??"",n=r.value;if(n.length===0){if(t==="0"){p();return}r.value=t}else if(n.length===1)r.value=n+t;else if(n.length===2)if(n==="10"&&t==="0")r.value=n+t;else{p();return}else return;v()})});d==null||d.addEventListener("click",()=>{r.value="",v()});l==null||l.addEventListener("click",()=>m("over"));c==null||c.addEventListener("click",()=>m("under"));o==null||o.addEventListener("click",()=>{h.close(),a.focus()});m("under");a==null||a.addEventListener("click",()=>{const e=y(Number(r.value)),t=k(),n=t>=51,E=t>=Math.max(0,e-2)&&t<=Math.min(101,e+2),f=M(),L=f==="over"&&n||f==="under"&&!n,i=`
      <div style="white-space:pre;text-align:left;">gezogen wurde:	${t}</div>
      <div style="white-space:pre;text-align:left;">daher Bereich:	${n?"drüber":"drunter"}</div>
    `;E?u.innerHTML=`
      ${i}
      <p class="super">EX EX EX leert eure Gläser</p>
    `:L?u.innerHTML=`
      ${i}
      <p class="ok">korrekter Bereich, ein Schluck für die Verlierer</p>
    `:u.innerHTML=`
      ${i}
      <p class="bad">das war nichts, trink selbst</p>
    `,h.showModal()});