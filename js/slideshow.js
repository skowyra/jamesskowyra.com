(() => {
  const gallery = document.getElementById('gallery');
  const overlay = document.getElementById('slideshow');
  const image   = document.getElementById('slideshow-image');
  const btnClose = document.getElementById('slideshow-close');
  const btnPrev  = document.getElementById('slideshow-prev');
  const btnNext  = document.getElementById('slideshow-next');

  if (!gallery || !overlay) return;

  const images = Array.from(gallery.querySelectorAll('img'));
  let current = 0;

  function open(index) {
    current = index;
    image.src = images[current].src;
    image.alt = images[current].alt;
    overlay.hidden = false;
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    overlay.hidden = true;
    document.body.style.overflow = '';
    images[current].focus();
  }

  function prev() {
    current = (current - 1 + images.length) % images.length;
    image.src = images[current].src;
    image.alt = images[current].alt;
  }

  function next() {
    current = (current + 1) % images.length;
    image.src = images[current].src;
    image.alt = images[current].alt;
  }

  // Open on gallery image click
  images.forEach((img, i) => {
    img.addEventListener('click', () => open(i));
  });

  btnClose.addEventListener('click', close);
  btnPrev.addEventListener('click', prev);
  btnNext.addEventListener('click', next);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (overlay.hidden) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  // Click outside image to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });
})();
