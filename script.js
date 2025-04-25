const track = document.getElementById("gallery");
const numscroll = document.getElementById("page-numscroll")

window.onmousedown = e => {
  track.dataset.mouseDownAt = e.clientX;
}

window.onmouseup = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
}

window.onmousemove = e => {
  if (track.dataset.mouseDownAt === "0") return;
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, maxDelta = window.innerWidth / 2;

  // scroll images
  const percentage = (mouseDelta / maxDelta) * -100;
  let nextPercentage = parseFloat(track.dataset.prevPercentage) + percentage;

  nextPercentage = Math.max(Math.min(nextPercentage, 0), -90);

  let nextPage = (nextPercentage * 2);

  nextPage = Math.max(Math.min(nextPage, 0), -180);

  track.dataset.percentage = nextPercentage;

  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });

  for (const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${nextPercentage + 100}% 50%`
    }, { duration: 1200, fill: "forwards" });
  }

  numscroll.animate({
    transform: `translate3d(0px, ${nextPage}px, 0px)`
  }, { duration: 1200, fill: "forwards" });
}
