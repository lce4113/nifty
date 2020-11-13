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
  var timestamps = text.match(/\d+(\n(.+,)+.+)+\n/g);
  timestamps = timestamps.map(stamp => {
    stamp = stamp.match(/(.+,)+.+/g);
    return {
      "date": stamp[0].split(',', 1)[0],
      "stamp": stamp.map(t => ({
        "name": t.split(',')[1],
        "country": t.split(',')[2],
        "value": t.split(',')[3],
        "category": t.split(',')[4]
      }))
    };
  });
  data.timestamps = timestamps;
  return data;
}