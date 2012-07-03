function humanReadable(obj, decPrec) {
  decPrec = decPrec || 2;
  var units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  if(typeof obj == 'number') {
    var ctr = 0;
    while(obj > 1024 && ctr < units.length-1) {
      ctr++;
      obj = obj/1024;
    }
    return (decPrec ? obj.toFixed(decPrec) : obj) + units[ctr];
  } else if(typeof obj == 'object') {
    Object.keys(obj).forEach(function(value, key) {
      obj[value] = humanReadable(obj[value], decPrec);
    });
  }

  return obj;
}

module.exports = humanReadable;
