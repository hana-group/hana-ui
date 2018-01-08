// seconds to time
export const smartFormatTime = time => {
  let s = ~~(time % 60);
  let m = time / 60;
  let h = 0;
  if (m >= 60) {
    h = h / 60;
    m = m % 60;
  }

  h = ~~h;
  m = ~~m;

  m = m < 10 ? `0${m}` : `${m}`;
  s = s < 10 ? `0${s}` : `${s}`;

  if (h) {
    return `${h}:${m}:${s}`;
  }
  return `${m}:${s}`;
};
