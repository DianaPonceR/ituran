import { AbstractControl, ValidatorFn } from "@angular/forms";

export function ShowLoader() {
    document.getElementById("loader").style.display = "block";
}

export function HideLoader(){
    document.getElementById("loader").style.display = "none";
}

export class RfcHelper {
    constructor(){}
    itm_fn_HomoclaveRFC (nombreCompleto: string): string {
        var equivalencia = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
        var caracter = "";
        var cadenaNums = "";
        var numero1 = 0;
        var numero2 = 0;
        var suma = 0;
        var homoclave = "";
        var cociente = 0;
        var residuo = 0;
        var total = 0;
        
        nombreCompleto = nombreCompleto.replace('’', '');
        
        total = nombreCompleto.length;
    
        for (var indice = 0; indice < total ; indice++ ) {
          caracter = nombreCompleto.substr(indice, 1);			
          var caracterResult = "";
    
          switch(caracter) {
            case ' ' : 
              caracterResult = "00";
              break;
            case '&' : 
              caracterResult = "10";
              break;
            case 'Ñ' : 
              caracterResult = '10';
              break;
            case 'A': case 'B': case 'C': case 'D': case 'E': case 'F': case 'G': case 'H': case 'I': 
              caracterResult = "0" + (caracter.charCodeAt(0) - 54).toString();							
                caracterResult = caracterResult.substr(caracterResult.length - 2, );
              break;
            case 'J': case 'K': case 'L': case 'M': case 'N': case 'O': case 'P': case 'Q': case 'R':
              caracterResult = "0" + (caracter.charCodeAt(0) - 53).toString();
                caracterResult = caracterResult.substr(caracterResult.length - 2, );
              break;
            case 'S': case 'T': case 'U': case 'V': case 'W': case 'X': case 'Y': case 'Z':
              caracterResult = "0" + (caracter.charCodeAt(0) - 51).toString();
                caracterResult = caracterResult.substr(caracterResult.length - 2, );
              break;
            default :
              caracterResult = "00";						
          }
      
          cadenaNums = cadenaNums.concat(caracterResult);
        }
      
        cadenaNums = '0' + cadenaNums;
    
        indice = 0;
        
        while( indice <= cadenaNums.length - 2)
        {
          numero1 = parseInt(cadenaNums.substr(indice, 2));
          numero2 = parseInt(cadenaNums.substr(indice + 1, 1));		
          suma = suma + numero1 * numero2;
    
          indice++;
        }
        
        suma = parseInt(suma.toString().substr(suma.toString().length - 3, 3));
        cociente =  suma / 34;				
        residuo = suma % 34;
    
        homoclave = equivalencia.substr(cociente, 1) + equivalencia.substr(residuo, 1);
              
        return homoclave;
    }

    itm_fn_DigitoVerificadorRFC(texto: string): string {
        var DigitoVerificador = '';
        var total = 0;
        var indice = 0;
        var caracter = '';
        var cadenaNums = '';
        var cont = 0;
        var numero = 0;
        var suma = 0;
        var residuo = 0;
        var modValue = 0;

        total = texto.length;
        modValue = (total = 12 ? 11 : 10);				
        indice = 0;

        while(indice <= total)
        {
            caracter = texto.substr(indice, 1);
            var caracterResult = "";

            switch(caracter) {
            case ' ': '37'; break;
            case '&': '24'; break;
            case 'Ñ': '38'; break;
            case 'A': case 'B': case 'C': case 'D': case 'E': case 'F': case 'G': case 'H': case 'I': case 'J': case 'K': case 'L': case 'M': case 'N': 
                caracterResult = (caracter.charCodeAt(0) - 55).toString();
                break;
            case 'O': case 'P': case 'Q': case 'R': case 'S': case 'T': case 'U': case 'V': case 'W': case 'X': case 'Y': case 'Z':
                caracterResult = (caracter.charCodeAt(0) - 54).toString();
                break
            case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9':
                caracterResult = '0' + caracter;
                break;
            default: caracterResult = '00';						
            }
            
            cadenaNums = cadenaNums + caracterResult;
            
            indice++;
        }				
            
        cont = 0;
        indice = 0;
        while(indice <= 23) {					
            numero = parseInt(cadenaNums.substr(indice, 2));					
            suma = suma + (numero * (13 - cont));

            cont = cont + 1;
            indice = indice + 2;
        }						

        residuo = suma % modValue;

        var digitoVerificador = (residuo == 0 ? '0' : (11 - residuo == 10 ? 'A' : (11 - residuo)));												

        return digitoVerificador.toString();
    }

    itm_fn_SustituirProhibidasRFC(texto: string): string{
        var sustituirProhibidas = "";
        var palabra = "";

        var tblProhibidas = [
        'BUEI', 'BUEY', 'CACA', 'CACO', 'CAGA', 'CAGO', 
        'CAKA', 'COGE', 'COJA', 'COJE', 'COJI', 'COJO', 'CULO', 
        'FETO', 'GUEY', 'JOTO', 'KACA', 'KACO', 'KAGA', 'KAGO', 
        'KAKA', 'KOGE', 'KOJO', 'KULO', 'MAME', 'MAMO', 'MEAR', 
        'MEON', 'MION', 'MOCO', 'MULA', 'PEDA', 'PEDO', 'PENE', 
        'PUTA', 'PUTO', 'QULO', 'RATA', 'RUIN'];

        sustituirProhibidas = texto

        if(tblProhibidas.indexOf(texto) >= 0){
            sustituirProhibidas = texto.substr(0,3).concat('X');
        }

        return sustituirProhibidas;
    }

    itm_fn_LetrasRFC (nombre: string, paterno: string, materno: string): string {
        var letrasRFC = "";
        var vocales;
        var vocal = "";
        var letras = "";
        var pos = 0;

        vocales = ['A', 'E', 'I', 'O', 'U'];

        if(materno.length == 0) {
            letras = paterno.substr(0, 2) + nombre.substr(0, 2);
        }
        else if(paterno.length < 3) {
            letras = paterno.substr(0, 1) + materno.substr(0, 1) + nombre.substr(0, 2)
        }
        else {
            pos = 1;
            while(pos <= paterno.length){						
            if( vocales.indexOf(paterno.substr(pos, 1), 0) >= 0) {							
                vocal = paterno.substr(pos, 1);
                break;
            }
            pos = pos + 1;
            }
            letras = paterno.substr(0, 1) + vocal + materno.substr(0, 1) + nombre.substr(0, 1);
        }

        letrasRFC = letras;				

        return letrasRFC;
    }

    itm_fn_RemoverPalabrasRFC(texto: string): string{
        var removerPalabras = texto;
        var palabras = [' PARA ', ' AND ', ' CON ', ' DEL ', ' LAS ', ' LOS ',
            ' MAC ', ' POR ', ' SUS ', ' THE ', ' VAN ', ' VON ', ' AL ', ' DE ', 
            ' EL ', ' EN ', ' LA ', ' MC ', ' MI ', ' OF ', ' A ', ' E ', ' Y '];
        var palabra= "";

        for(var indice = 0; indice < palabras.length; indice++) {
            removerPalabras = " " + removerPalabras + " ";
            palabra = palabras[indice];										
            while(removerPalabras.indexOf(palabra) >= 0) {						
            removerPalabras = removerPalabras.replace(palabra, " ");
            }
        }
        
        return removerPalabras.trim();
    }

    itm_fn_RemoverNombresRFC(texto: string): string {
        var removerNombres = texto;
        var nombres = [' MARIA ', ' JOSE ', ' MA. ', ' MA ', ' J. ', ' J '];
        var nombre = "";

        for(var indice = 0; indice < nombres.length; indice++) {
            removerNombres = " " + removerNombres + " ";
            nombre = nombres[indice];										
            while(removerNombres.indexOf(nombre) >= 0) {						
            removerNombres = removerNombres.replace(nombre, " ");
            }
        }
                
        return removerNombres.trim();
    }

    itm_fn_FormatoTextoRFC(texto: string): string {				
        var removerVocalesAcentuadas = texto.toUpperCase();
        var vocales = ['A', 'E', 'I', 'O', 'U'];
        var vocalesAcentuadas = ['Á', 'É', 'Í', 'Ó', 'Ú'];
        var vocal = "";

        for(var indice = 0; indice < vocalesAcentuadas.length; indice++) {
            vocal = vocalesAcentuadas[indice];										
            while(removerVocalesAcentuadas.indexOf(vocal) >= 0) {						
            removerVocalesAcentuadas = removerVocalesAcentuadas.replace(vocal, vocales[indice]);
            }
        }
                
        return removerVocalesAcentuadas.trim();
    }

    itm_fn_RFC(nombre: string, paterno: string, materno: string, nacimiento: string): string {
        var nombreRFC = "";
        var paternoRFC = "";
        var maternoRFC = "";
        var claveRFC = "";
        var NombreAux = "";

        nombre = nombre.toUpperCase();
        paterno = paterno.toUpperCase();
        materno = materno.toUpperCase();

        //Aplicar formato y remover palabras y nombres de textos
        nombreRFC = this.itm_fn_FormatoTextoRFC(nombre);
        paternoRFC = this.itm_fn_FormatoTextoRFC(paterno);
        maternoRFC = this.itm_fn_FormatoTextoRFC(materno);
        
        NombreAux = nombreRFC + ' ' + paternoRFC + ' ' + maternoRFC;
        nombreRFC = this.itm_fn_RemoverNombresRFC(this.itm_fn_RemoverPalabrasRFC(nombreRFC));
        paternoRFC = this.itm_fn_RemoverPalabrasRFC(paternoRFC);
        maternoRFC = this.itm_fn_RemoverPalabrasRFC(maternoRFC);

        //Generar las 4 primeras letras y sustituir palabras prohibidas
        claveRFC = this.itm_fn_SustituirProhibidasRFC(this.itm_fn_LetrasRFC(nombreRFC, paternoRFC, maternoRFC));
        
        //Concatenar dígitos de fecha de nacimiento 1995/05/13 yyyy/mm/dd
        claveRFC = claveRFC + nacimiento.substr(2,2) + nacimiento.substr(5,2) + nacimiento.substr(8,2);

        //Generar homonimia y concatenar al RFC	
        claveRFC = claveRFC + this.itm_fn_HomoclaveRFC(NombreAux);

        //Generar dígito verificador y concatenar al RFC
        claveRFC = claveRFC + this.itm_fn_DigitoVerificadorRFC(claveRFC);

        return claveRFC;
    }
}


export function validateEmptyString(c: AbstractControl) : { [key: string]: boolean } | null {
    var str = c.value + ""
    if (str.trim().length === 0) {
        return { 'emptyString': true }
    }
    return null
}

export function validateValueChanged(originalValue: any): ValidatorFn {
    return (c: AbstractControl) : { [key: string]: boolean } | null => {
        if(c.value === originalValue) {
            return { 'valueChanged': true }
        }
        return null
    }
}

export function scrollTo(id: string) {
    var offset = 90; // sticky nav height
    var el = document.getElementById(id); // element you are scrolling to
    window.scroll({ top: (el.offsetTop - offset), left: 0, behavior: 'smooth' });
}

export function isLetterKey(e) {
    var tecla = (document.all) ? e.keyCode : e.which;
  
    //Tecla de retroceso para borrar, siempre la permite
    if (tecla == 8) {
        return true;
    }
  
    // Patron de entrada, en este caso solo acepta numeros y letras
    var patron = /[A-Z a-zÑñ]/;
    var tecla_final = String.fromCharCode(tecla);
    return patron.test(tecla_final);
  }
