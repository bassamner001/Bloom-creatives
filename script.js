setTimeout(function(){
  var l=document.getElementById('loader');
  l.classList.add('open');
  setTimeout(function(){l.classList.add('gone');},1300);
},3200);

// SCROLL
window.addEventListener('scroll',function(){
  var s=document.documentElement,st=s.scrollTop||document.body.scrollTop,sh=(s.scrollHeight||document.body.scrollHeight)-s.clientHeight;
  document.getElementById('prog').style.width=(st/sh*100)+'%';
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60);
});

// DRAWER
function openDrawer(){document.getElementById('drawer').classList.add('open');document.getElementById('drawerOverlay').classList.add('open');document.body.style.overflow='hidden';}
function closeDrawer(){document.getElementById('drawer').classList.remove('open');document.getElementById('drawerOverlay').classList.remove('open');document.body.style.overflow='';}
document.getElementById('drawerOverlay').addEventListener('click',closeDrawer);

// NAV
var revObs;
function showPage(id, addHistory){
  document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});
  var pg=document.getElementById('page-'+id);
  if(pg){pg.classList.add('active');}
  document.querySelectorAll('.nb-links a,.drawer-links a').forEach(function(a){a.classList.toggle('active',a.dataset.page===id);});
  window.scrollTo({top:0,behavior:'instant'});
  closeDrawer();
  if(addHistory !== false){
    try { history.pushState({page:id}, '', window.location.pathname); } catch(e){}
  }
  setTimeout(function(){
    if(revObs){document.querySelectorAll('.rev,.rev-l,.rev-r').forEach(function(el){if(!el.classList.contains('v'))revObs.observe(el);});}
  },50);
}
// Back button: go to home, or if already home let browser exit
window.addEventListener('popstate', function(e){
  var id = (e.state && e.state.page) ? e.state.page : 'home';
  showPage(id, false);
});
window.addEventListener('load', function(){
  try { history.replaceState({page:'home'}, '', window.location.pathname); } catch(e){}
});

// REVEAL
revObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('v');});},{threshold:0.08});
document.querySelectorAll('.rev,.rev-l,.rev-r').forEach(function(r){revObs.observe(r);});

// COUNT UP
function animCount(el){
  var target=parseInt(el.dataset.count),v=0,step=target/120;
  el.textContent='0';
  var t=setInterval(function(){v+=step;if(v>=target){v=target;clearInterval(t);}el.textContent=Math.floor(v).toLocaleString();},16);
}
var cntObs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){animCount(e.target);cntObs.unobserve(e.target);}});},{threshold:0.5});
document.querySelectorAll('[data-count]').forEach(function(el){cntObs.observe(el);});

// LIGHTBOX
function openLB(el){
  var img=el.querySelector('img');
  if(!img)return;
  document.getElementById('lbImg').src=img.src;
  var cap=el.querySelector('.gi-label');
  document.getElementById('lbCap').textContent=cap?cap.textContent:'';
  document.getElementById('lb').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeLB(e){
  if(!e||e.target===document.getElementById('lb')||e.target.classList.contains('lb-x')){
    document.getElementById('lb').classList.remove('open');
    document.body.style.overflow='';
  }
}
document.querySelector('.lb-x').addEventListener('click',function(){closeLB();});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeLB();closeDrawer();}});

// CONTACT FORM
var cf=document.getElementById('contactForm');
if(cf){cf.addEventListener('submit',function(e){
  e.preventDefault();
  var name=document.getElementById('cf-name').value;
  var service=document.getElementById('cf-service').value;
  var msg=document.getElementById('cf-msg').value;
  window.open('https://wa.me/255684666676?text='+encodeURIComponent('Hi! My name is '+name+'. I am interested in '+service+'. '+msg),'_blank');
});}
</script>
