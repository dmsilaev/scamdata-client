// http://gizma.com/easing/
//t = current time
//b = start value
//c = change in value
//d = duration
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) return c/2*t*t + b;
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

export const scrollTo = (element, offset, duration) => {
  return new Promise((resolve) => {
    const start = element.scrollLeft,
      increment = 10;

    let currentTime = 0;

    const animateScroll = () => {
      const val = Math.easeInOutQuad(currentTime, start, offset, duration);
      element.scrollLeft = val;

      currentTime += increment;
      currentTime < duration
        ? setTimeout(animateScroll, increment)
        : resolve(element)
    };

    animateScroll();
  });
}
