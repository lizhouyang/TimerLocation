const moment = require('moment.min.js');
function formatTime(time, format) {
  let temp = '0000000000' + time
  let len = format.length
  return temp.substr(-len)
}

module.exports = {
  formatTime: formatTime,
  dateFormat: function (item, format) {
      moment.locale('en', {
        longDateFormat: {
          l: "YYYY-MM-DD",
          L: "YYYY-MM-DD HH:mm"
        }
      });
      if (format == undefined) { format = 'L' }
      return moment(item).format(format);
  }
}