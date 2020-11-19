async function getData(url, json = false) {
  const response = await fetch(url);
  if (json) return await response.json();
  return await response.text();
}

function parseData(text) {
  var data = {};
  const meta = text.split('\n', 3);
  data.title = meta[0];
  data.units = meta[1];
  data.source = meta[2];
  var timestamps = text.match(/(\d+)?(\n(.+,)+.+)+\n/g);
  timestamps = timestamps.map(stamp => {
    stamp = stamp.match(/(.+,)+.+/g);
    var bars = stamp.map(t => {
      const split = t.split(',', 5);
      return {
        "name": split[1],
        "country": split[2],
        "value": split[3],
        "category": split[4]
      };
    });
    bars.sort((a, b) => b.value - a.value);
    bars = bars.slice(0, 10);
    return {
      "date": stamp[0].split(',', 1)[0],
      "bars": bars
    };
  });
  data.timestamps = timestamps;
  return data;
}

function sortData(data) {
  data.timestamps = data.timestamps.map(stamp => {
    stamp.bars = stamp.bars
      .sort((a, b) => b.value - a.value).slice(0, 10);
    return stamp;
  });
  console.log(data);
  return data;
}