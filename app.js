const form = document.querySelector("form");
const guessBtn = document.getElementById("guess-btn");
const restartBtn = document.getElementById("restart-btn");
const guess = document.getElementById("guess");
const guessDiv = document.querySelector(".last-guesses");
const result = document.getElementById("result");

//her oyun açıldığında kod bir sayı belirlemeli/tutmalı
let number = Math.floor(Math.random() * 100) + 1;
// tahmin yaptığımız sayılardan oluşacak array
let lastGuesses = [];

// console.log(number);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (guess.value === "" || lastGuesses.includes(guess.value)) {
    //ekrana hata yazdır
    result.style.color = "red";
    result.textContent = lastGuesses.includes(guess.value)
      ? "bunu önceden yazdın "
      : "bir sayı giriniz";
    setTimeout(() => {
      result.textContent = "";
    }, 2000);
  } else {
    // number'ı kıyasla
    console.log(guess.value, number);
    result.style.color = "black";
    lastGuesses.push(guess.value);
    let diff = Math.abs(guess.value - number);
    printLastGuess();
    getDiff(diff);
  }
});

restartBtn.addEventListener("click", restart);

function getDiff(diff) {
  // bizim girdiğimiz sayılarla number'ı kıyasla
  if (diff == 0) {
    result.textContent = "tebrikler, KAZANDIN!";
    restartBtn.style.display = "block";
  } else if (diff < 5) {
    result.textContent = "çok yakın";
  } else if (diff < 15) {
    result.textContent = "yakın";
  } else if (diff < 40) {
    result.textContent = "uzak";
  } else {
    result.textContent = "çok uzak";
  }
}

function printLastGuess() {
  // doğru olmayan tahminlerimizi ekrana yazdır
  let index = lastGuesses.length - 1; // arraydeki son elemanın indeksi
  let li = document.createElement("li");
  li.textContent = lastGuesses[index];
  guessDiv.appendChild(li);
}

function restart() {
  // herşeyi, array'i falan sıfırlasın, oyunu yeniden başlatsın
  result.textContent = "";
  guessDiv.textContent = "";
  restartBtn.style.display = "none";
  form.reset();
  number = Math.floor(Math.random() * 100) + 1;
}
