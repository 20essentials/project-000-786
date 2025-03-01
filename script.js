const $ = el => document.querySelector(el);
const $$ = el => document.querySelectorAll(el);

function magnify(imgID, zoom) {
  const img = document.getElementById(imgID);
  const glass = document.createElement('div');
  glass.className = 'img-magnifier-glass';
  img.parentElement.insertBefore(glass, img);

  Object.assign(glass.style, {
    backgroundImage: `url('${img.src}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${img.width * zoom}px ${img.height * zoom}px`
  });

  const bw = 3;
  const w = glass.offsetWidth / 2;
  const h = glass.offsetHeight / 2;

  const moveMagnifier = e => {
    e.preventDefault();

    const { x, y } = getCursorPos(e);
    const clampedX = Math.max(w / zoom, Math.min(x, img.width - w / zoom));
    const clampedY = Math.max(h / zoom, Math.min(y, img.height - h / zoom));

    Object.assign(glass.style, {
      left: `${clampedX - w}px`,
      top: `${clampedY - h}px`,
      backgroundPosition: `-${clampedX * zoom - w + bw}px -${
        clampedY * zoom - h + bw
      }px`
    });
  };

  const getCursorPos = e => {
    const { left, top } = img.getBoundingClientRect();
    let x, y;

    if (e.touches) {
      x = e.touches[0].pageX - left - window.pageXOffset;
      y = e.touches[0].pageY - top - window.pageYOffset;
    } else {
      x = e.pageX - left - window.pageXOffset;
      y = e.pageY - top - window.pageYOffset;
    }

    return { x, y };
  };

  [glass, img].forEach(el => {
    el.addEventListener('mousemove', moveMagnifier);
    el.addEventListener('touchmove', moveMagnifier, { passive: false });
  });
}

magnify('myimage', 3);
