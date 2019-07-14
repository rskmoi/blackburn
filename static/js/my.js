(function (window, document) {
  function sort(tbody, compareFunction) {
    var rows = tbody.children;
    if(!rows || !rows[0] || rows.length == 1) return;
    var size = rows.length;
    var arr = [];
    for(var i = 0; i < size; i++) arr.push(rows[i]);
    arr.sort(compareFunction);
    for(var i = size - 1; i > 0; i--) tbody.insertBefore(arr[i-1], arr[i]);
  }
  function numConvert(s) {
    return s == Number(s) ? Number(s) : s; 
  }
  function asc(idx) {
    return function(a, b) {
      var a_ = numConvert(a.children[idx].innerText);
      var b_ = numConvert(b.children[idx].innerText);
      return a_ > b_ ? 1 : -1;
    };
  }
  function desc(idx) {
    return function(a, b) {
      var a_ = numConvert(a.children[idx].innerText);
      var b_ = numConvert(b.children[idx].innerText);
      return a_ < b_ ? 1 : -1;
    };
  }
  function sortEvent(tbody, idx) {
    var mode = true;
    return function(e) {
      if(mode) sort(tbody,  asc(idx));
      else     sort(tbody, desc(idx));
      mode = !mode;
    };
  }
  var ts = document.getElementsByTagName('table');
  for(var i = ts.length; i--; ) {
    var ths = ts[i].tHead.getElementsByTagName('th');
    for(var j = ths.length; j--; )
      ths[j].addEventListener("click", sortEvent(ts[i].tBodies[0], j));
  }
}(this, this.document));
