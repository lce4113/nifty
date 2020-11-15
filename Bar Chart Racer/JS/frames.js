const colors = [
  "rgb(195, 200, 220)",
  "rgb(215, 210, 185)",
  "rgb(225, 185, 175)",
  "rgb(210, 190, 195)",
  "rgb(240, 215, 170)",
  "rgb(200, 235, 180)",
  "rgb(185, 225, 245)"
];
var categories, categoryNum;

function comma(n) {
  return n.toString().split('').reverse()
    .map((a, i) => a + ((i || 1) % 3 ? '' : ','))
    .reverse().join('');
}

function setup(data) {
  categories = {};
  categoryNum = 0;
  $("#title").text(data.title);
  console.log(data);
  console.log(data.units);
  $("#units").text(data.units);
  $("#info").html(`
<div id="date"></div>
<div id="source">${data.source}</div>`);
}

function draw(stamp) {
  $("#graph").empty();
  const max = stamp.bars[0].value;
  for (const bar of stamp.bars) {
    if (categories[bar.category]) {
      var barColor = categories[bar.category];
    } else {
      var barColor = colors[categoryNum % colors.length];
      categories[bar.category] = barColor;
      categoryNum++;
    }
    $("#graph").append(`
  <div class="bar" style="background: ${barColor};
width: ${bar.value / max * 90}%;">
    <div class="name">${bar.name}</div>
    <div class="value">${comma(bar.value)}</div>
  </div>`);
  }

  $("#hashes").empty();
  const div = parseInt(max / 8);
  const len = div.toString().length - 1;
  const r = Math.ceil(div / 10 ** len);
  const baseDigit = r == 2 ? 2 : r < 5 ? 5 : 10;
  const base = baseDigit * 10 ** len;
  const hashes = Math.floor(max / base);
  // console.log(max, len, r, baseDigit, base, hashes);
  for (let i = 0; i <= hashes; i++) {
    $("#hashes").append(`
<div class="hash">
  <div class="num">${comma(base * i)}</div>
  <div class="line"></div>
</div>`)[0].style = `width: ${base * hashes / max * 90}%;`;
  }

  $("#date").text(stamp.date);
}