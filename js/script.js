document.getElementById("tema").onclick=function(){
  var r=document.documentElement;
  var escuro=r.dataset.theme==="dark"||(r.dataset.theme!=="light"&&matchMedia("(prefers-color-scheme: dark)").matches);
  r.dataset.theme=escuro?"light":"dark";
};

var p={A:0,B:0};
try{var s=JSON.parse(localStorage.getItem("placar"));if(s)p=s;}catch(e){}
function upd(){
  document.getElementById("gA").textContent=p.A;
  document.getElementById("gB").textContent=p.B;
  document.getElementById("msg").textContent=p.A===p.B?(p.A?"Tudo igual por enquanto.":"Bola rolando."):(p.A>p.B?"O Time A está na frente.":"O Time B está na frente.");
  try{localStorage.setItem("placar",JSON.stringify(p));}catch(e){}
}
document.querySelectorAll("[data-t]").forEach(function(b){
  b.onclick=function(){var t=b.dataset.t;p[t]=Math.max(0,p[t]+Number(b.dataset.d));upd();};
});
document.getElementById("zerar").onclick=function(){p={A:0,B:0};upd();};
upd();

var Q=[
  {q:"Quantos jogadores cada time coloca em campo?",o:["9","10","11","12"],c:2},
  {q:"Qual país tem mais títulos de Copa do Mundo masculina?",o:["Alemanha","Brasil","Itália","Argentina"],c:1},
  {q:"Quanto dura uma partida, sem os acréscimos?",o:["80 minutos","90 minutos","100 minutos","120 minutos"],c:1},
  {q:"Qual cartão significa expulsão?",o:["Amarelo","Azul","Vermelho","Verde"],c:2},
  {q:"Quem é o único que pode pegar a bola com as mãos?",o:["Lateral","Goleiro","Zagueiro","Meia"],c:1}
];
var i=0,pts=0,box=document.getElementById("qBox");
function draw(){
  if(i>=Q.length){
    box.innerHTML="<h3>Fim de jogo: "+pts+" de "+Q.length+" acertos.</h3><button class='bt' id='again'>Jogar de novo</button>";
    document.getElementById("again").onclick=function(){i=0;pts=0;draw();};
    return;
  }
  var q=Q[i];
  box.innerHTML="<div class='q-top'><span>Pergunta "+(i+1)+"/"+Q.length+"</span><span>"+pts+" pts</span></div><h3>"+q.q+"</h3><div></div>";
  var a=box.lastChild;
  q.o.forEach(function(t,k){
    var b=document.createElement("button");
    b.className="op";b.textContent=t;
    b.onclick=function(){
      a.querySelectorAll("button").forEach(function(x){x.disabled=true;});
      if(k===q.c){b.classList.add("ok");pts++;}else{b.classList.add("no");a.children[q.c].classList.add("ok");}
      setTimeout(function(){i++;draw();},1000);
    };
    a.appendChild(b);
  });
}
draw();
