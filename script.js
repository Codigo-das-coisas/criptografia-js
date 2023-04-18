const divcontainer = document.querySelector(".container");
const textBoxMensagem = document.querySelector('.txtMensagem');
const buttonTestarMensagem = document.querySelector('.buttonTestarMensagem');
const txtBoxMensagemCriptografada = document.querySelector('.txtMensagemCriptografada');
const buttonSalvarMensagem = document.querySelector(".buttonSalvarMensagem");
const descriptodarBloco = document.querySelector(".descriptordarBloco");
const txtChave = document.querySelector(".txtChave");
const txtMensagemDescriptografada = document.querySelector(".txtMensagemDescriptografada");
const chave = 1234567;

let mensagem;
let chaveBloqueada = validandoNaoRepetirCaracteresNaCriacaoDaChave(chave);

if(!chaveBloqueada){


   buttonTestarMensagem.addEventListener("click", (e) => {
      e.preventDefault();

      if(validaLetraDigitada(textBoxMensagem.value)){
         alert("SÓ PODE DIGITAR LETRAS MAIÚSCULAS");
      } else {
         txtBoxMensagemCriptografada.value = criptografia(chave, textBoxMensagem.value);
      }

   })


   buttonSalvarMensagem.addEventListener("click", (e) => {
      e.preventDefault();

      if(txtChave.value == chave){
         txtMensagemDescriptografada.value = descriptografia(chave, txtBoxMensagemCriptografada.value);
      } else {
         alert("CHAVE INVÁLIDA");
         txtMensagemDescriptografada.value = "";
      }
   })

} else {
   divcontainer.computedStyleMap.display = "none";
   document.querySelector("h1").style.display = black;
}

function validandoNaoRepetirCaracteresNaCriacaoDaChave(chave){
   let chave_ = chave.toString();
   let bloqueado = false;

   for(let i = 0; i < chave_.length; i++){

      for(let j = i + 1; j < chave_.length; j++){
         if(chave_[i] == chave_[j]){
            bloqueado = true
         }
      }

   }
   if(chave_.length != 7){
      bloqueado = true;
   }

   return bloqueado;
}

function validaLetraDigitada(mensagem){
   const letrasPermitidas = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',' ',''];

   let encontrado = true;

   for(let i = 0; i < mensagem.length; i++){

      for(let t = 0; t < letrasPermitidas.length; t++){

         if(mensagem[i] == letrasPermitidas[t]){
            encontrado = false;
            break;
         } else {
            encontrado = true;
         }

      }
      if(encontrado){
         break;
      }

   }

   return encontrado;

}

function criptografia(chave,mensagem){
   let blocosCriptografado = '';

   for(let i = 0; i < mensagem.length; i++){

      let numeroCriptografado = mensagem[i].charCodeAt() + chave;

      console.log(numeroCriptografado);

      blocosCriptografado += numeroCriptografado.toString();
   }

   return blocosCriptografado;
}

function descriptografia(chave, mensagemCriptografada){
   let mensagemaberta = "";
   let count = 0;

   for(let i = 0; i < mensagemCriptografada.length; i +=chave.toString().length){
      count+=1;
      let blococriptografado = parseInt(mensagemCriptografada.substring(i,chave.toString().length * count));
      let blocoDecriptado = blococriptografado - chave;

      console.log(blocoDecriptado, String.fromCharCode(blocoDecriptado))

      mensagemaberta += String.fromCharCode(blocoDecriptado);
   }

   return mensagemaberta;
}