document.addEventListener('DOMContentLoaded', function(){

  // Smooth scroll for nav links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const href = this.getAttribute('href');
      if(!href || href === '#') return;
      const id = href.substring(1);
      const sec = document.getElementById(id);
      if(sec){
        window.scrollTo({
          top: sec.offsetTop - 90,
          behavior: 'smooth'
        });
      }
    });

    // pointer + hover color handled inline
    a.style.cursor = 'pointer';
    a.addEventListener('mouseenter', ()=> a.style.color = '#ff8a00');
    a.addEventListener('mouseleave', ()=> {
      if(!a.classList.contains('active')) a.style.color = '';
    });
  });

  // Set active nav based on scroll position
  const sections = document.querySelectorAll('.section');
  function setActiveByScroll(){
    const scrollPos = window.scrollY;
    sections.forEach(sec=>{
      const top = sec.offsetTop - 120;
      const h = sec.offsetHeight;
      const id = sec.id;
      const link = document.querySelector('.nav-link[href="#' + id + '"]');
      if(scrollPos >= top && scrollPos < top + h){
        if(link){
          document.querySelectorAll('.nav-link').forEach(n=> n.classList.remove('active'));
          link.classList.add('active');
          // ensure color shows
          document.querySelectorAll('.nav-link').forEach(n=> n.style.color = '');
          link.style.color = '#ff8a00';
        }
      }
    });
  }
  window.addEventListener('scroll', setActiveByScroll);
  setActiveByScroll(); // initial

  // Portfolio filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', function(){
      filterBtns.forEach(b=> b.classList.remove('active'));
      this.classList.add('active');
      const f = this.getAttribute('data-filter');
      galleryItems.forEach(item=>{
        if(f === 'all' || item.classList.contains(f)) item.style.display = 'block';
        else item.style.display = 'none';
      });
    });
  });

  // Lightbox
  const lightbox = document.getElementById('lightbox');
  if(lightbox){
    const lbImg = document.getElementById('lb-img');
    const lbCaption = document.getElementById('lb-caption');
    const lbClose = document.getElementById('lb-close');
    const lbPrev = document.getElementById('lb-prev');
    const lbNext = document.getElementById('lb-next');
    let gallery = Array.from(document.querySelectorAll('.gallery-item'));
    let currentIndex = 0;

    function openLightbox(index){
      const item = gallery[index];
      const img = item.querySelector('img');
      lbImg.src = img ? img.src : '';
      lbCaption.textContent = item.getAttribute('data-title') || '';
      lightbox.classList.remove('hidden');
      currentIndex = index;
    }
    function closeLightbox(){ lightbox.classList.add('hidden'); }
    gallery.forEach((g, idx)=> g.addEventListener('click', ()=> openLightbox(idx)));
    if(lbClose) lbClose.addEventListener('click', closeLightbox);
    if(lbPrev) lbPrev.addEventListener('click', ()=> { currentIndex = (currentIndex -1 + gallery.length)%gallery.length; openLightbox(currentIndex); });
    if(lbNext) lbNext.addEventListener('click', ()=> { currentIndex = (currentIndex +1)%gallery.length; openLightbox(currentIndex); });
    lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  }

});
