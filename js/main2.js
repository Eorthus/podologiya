'use strict'

document.addEventListener("DOMContentLoaded", function() { 
//phone autoform

  function regular() {
    let pattern = /(\+7|8)[\s(]?(\d{3})[\s)]?(\d{3})[\s-]?(\d{2})[\s-]?(\d{2})/g;
    document.querySelector(".body-index").innerHTML = document.querySelector(".body-index").innerHTML.replace(pattern, '+7($2)$3-$4-$5');
}
if((!document.querySelector(".contacts-map"))&(!document.querySelector(".index-map-container"))&(!document.querySelector(".index-feedback"))){
regular();
}
  //phone mask for form
  var phoneInput = document.querySelectorAll('.phone')
  phoneInput.forEach(el =>
  el.addEventListener('keydown', function(event) {
     if( !(event.key == 'ArrowLeft' || event.key == 'ArrowRight' || event.key == 'Backspace' || event.key == 'Tab')) { event.preventDefault() }
      var mask = '+7 (111) 111-11-11'; // Задаем маску
      if (/[0-9\+\ \-\(\)]/.test(event.key)) {
          // Здесь начинаем сравнивать this.value и mask
          // к примеру опять же
          var currentString = this.value;
          var currentLength = currentString.length;
          if (/[0-9]/.test(event.key)) {
              if (mask[currentLength] == '1') {
                  this.value = currentString + event.key;
              } else {
                  for (var i=currentLength; i<mask.length; i++) {
                  if (mask[i] == '1') {
                      this.value = currentString + event.key;
                      break;
                  }
                  currentString += mask[i];
                  }
              }
          }
      } 
  }));

}); 