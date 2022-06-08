const startTime = Date.now();
const arrayOfButtons = document.querySelectorAll(".btn");
const victoryScreen = document.querySelector(".victory");
const highscoreParagraph = document.querySelector(".highscoreParagraph");
const timeParagraph = document.querySelector(".timeParagraph");
const buttonOnePhrases = [
  "Försök trycka på mig 😉",
  "Haha nära 😂",
  "Försök igen 😘",
  "Nästan! En gång till 🤣",
  "Försöker du ens? 😒",
  "Ger du upp? 🤷‍♂️",
  "För långsam 🐌",
  "🐌🐌🐌🐌🐌🐌🐌🐌",
  "Jag kommer somna snart... 💤💤💤",
  "Oj! 🥴",
  "😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️",
  "🤬🤬🤬🤬🤬🤬🤬🤬",
  "Tip: Money can be exchanged for goods and services",
  "Ser ut som att Aesop hade fel 🐢",
  "Slow ride, take it easy 🎸",
  "Loading...",
  "💤💤💤💤💤💤",
  "Verkar som att du är !fast",
  "player === fast //false",
];
const [buttonOne, buttonTwo, buttonThree] = arrayOfButtons;
const clicked = [];
let score = 0;
buttonThree.style.opacity = 0;

const randomlyPositionElement = (event) => {
  const randomNum = Math.floor(Math.random() * buttonOnePhrases.length);
  const randY = Math.floor(Math.random() * 80);
  const randX = Math.floor(Math.random() * 80);
  setTimeout(() => {
    event.target.style.top = randY + "vh";
    event.target.style.right = randX + "vw";
    buttonOne.innerText = buttonOnePhrases[randomNum];
  }, 100);
};
const handleButtonTwoScroll = () => {
  buttonTwo.removeEventListener("wheel", handleButtonTwoScroll);
  buttonTwo.removeEventListener("click", incrementSleepyness);
  buttonTwo.style.opacity = 1;
  score++;
  updateScore(buttonTwo);
  buttonTwo.classList.remove("button-2--animation");
};
const handleButtonOneClick = (event) => {
  event.target.removeEventListener("mouseover", randomlyPositionElement);
  event.target.removeEventListener("click", handleButtonOneClick);
  score++;
  updateScore(event.target);
};
const decrementOpacity = (event) => {
  for (let i = 9; i > 0; i--) {
    setTimeout(() => {
      event.target.style.opacity = `0.${i}`;
      if (i === 1) {
        event.target.style.opacity = 0.3;
        event.target.addEventListener("click", incrementSleepyness);
        event.target.innerText = "pröva scrolla";
        buttonTwo.addEventListener("wheel", handleButtonTwoScroll);
      }
    }, 10000 / i);
  }
  event.target.removeEventListener("mouseover", decrementOpacity);
};
const incrementSleepyness = (event) => {
  event.target.style.opacity = 1;
  event.target.innerText = "";
  for (let i = 0; i < 13; i++) {
    setTimeout(() => {
      if (i % 2 === 0) event.target.innerText += "Z";
      if (i % 2 !== 0) event.target.innerText += "z";
      if (i === 2) {
        event.target.addEventListener("mouseover", decrementOpacity);
      }
    }, 1000 * i);
  }
  event.target.removeEventListener("click", incrementSleepyness);
};
const destroyAllButtons = (element) => {
  const nodeListOfButtons = document.querySelectorAll(".destroy"); //Need to select the buttons here because they are not present in the DOM on load
  nodeListOfButtons.forEach((button) => button.remove());
  buttonThree.removeEventListener("click", destroyAllButtons);
  buttonThree.style.opacity = 0;
  renderVictoryScreen();
};
const finalButtonBoss = () => {
  buttonOne.style.opacity = 0;
  buttonTwo.style.opacity = 0;
  buttonThree.style.opacity = 1;
  buttonThree.style.top = Math.floor(Math.random() * 100 + 5) + "vh";
  buttonThree.style.right = Math.floor(Math.random() * 100 + 5) + "vw";
  buttonThree.addEventListener("click", destroyAllButtons);
  const div = document.createElement("div");
  document.body.appendChild(div);
  for (let i = 0; i < 70; i++) {
    let btn = document.createElement("button");
    btn.style.position = "absolute";
    btn.style.transition = "all 200ms ease-out;";
    btn.style.top = Math.floor(Math.random() * 100) + "vh";
    btn.style.right = Math.floor(Math.random() * 100) + "vw";
    btn.addEventListener("mouseover", randomlyPositionElement);
    btn.innerText = "Åh, neeeej!";
    btn.classList.add("destroy");
    div.appendChild(btn);
  }
};
const updateScore = (element) => {
  element.innerText = `Du har tryck på ${score} / 3 knappar 😎`;
  if (!clicked.element) clicked.push(element);
  clicked.forEach(
    (alreadyClicked) =>
      (alreadyClicked.innerText = `Du har tryck på ${score} / 3 knappar 😎`)
  );
  if (score === 2) {
    setTimeout(() => {
      finalButtonBoss();
    }, 2000);
  }
};
const renderVictoryScreen = () => {
  const finalTime = (Date.now() - startTime) / 1000;
  victoryScreen.classList.toggle("hidden");
  victoryScreen.style.display = "flex";
  timeParagraph.textContent = `Time: ${getFinishedTimeInMinutes(finalTime)}`;
  const hs = localStorage.getItem("highscore");
  if (!hs) {
    highscoreParagraph.innerText = `Highscore: ${getFinishedTimeInMinutes(
      finalTime
    )}`;
    localStorage.setItem("highscore", finalTime.toFixed(2));
    return;
  }
  if (+hs >= +finalTime.toFixed(2)) {
    localStorage.setItem("highscore", finalTime.toFixed(2));
    highscoreParagraph.innerText = `Highscore: ${getFinishedTimeInMinutes(
      finalTime
    )}`;
    return;
  }
  highscoreParagraph.innerText = `Highscore: ${getFinishedTimeInMinutes(hs)}`;
};
const getFinishedTimeInMinutes = (value) => {
  const sec = parseInt(value, 10);
  let hours = Math.floor(sec / 3600);
  let minutes = Math.floor((sec - hours * 3600) / 60);
  let seconds = sec - hours * 3600 - minutes * 60;
  if (minutes < 10) minutes = "0" + minutes;
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};
(() => {
  buttonTwo.addEventListener("click", incrementSleepyness);
  buttonOne.addEventListener("mouseover", randomlyPositionElement);
  buttonOne.addEventListener("click", handleButtonOneClick);
})();
