function putScrollAt(id){
    document.getElementById(id).scrollIntoView({behavior: "smooth"});
  }
  
  function isNumberKey(e) {
    tecla = (document.all) ? e.keyCode : e.which;
  
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
  
    // Patron de entrada, en este caso solo acepta numeros y letras
    patron = /[0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
  }
  
  function isLetterKey(e) {
    tecla = (document.all) ? e.keyCode : e.which;
  
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
  
    // Patron de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Z a-zÑñ]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
  }
  
  function check(e) {
    tecla = (document.all) ? e.keyCode : e.which;
  
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
    // Patron de entrada, en este caso solo acepta numeros y letras
    patron = /[A-Za-z0-9]/;
    tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
  }
  
  function setFactura(op){
    if(op == 1){
      document.getElementById("facturaNo").checked = false;
    }
    if(op == 2){
      document.getElementById("facturaSi").checked = false;
    }
  }
  
//   $(document).ready(function() {
//     $('#play-video').on('click', function(ev) {
   
//       $("#video_ituran")[0].src += "&autoplay=1";
//       ev.preventDefault();
   
//     });
//   });