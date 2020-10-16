const colorBoxs = document.querySelectorAll('.color');
const rollBtn = document.querySelector('#roll');
const colorBets = document.querySelector('#colorBets');
const displayMoney = document.querySelector('#money');

const colors = ['red', 'pink', 'yellow', 'blue', 'green', 'white'];
const bets = {};
let pocketMoney = 500;

colors.forEach(color => {
  color => (bets[color] = 0);
  colorBets.innerHTML += `
        <input 
          style="background: ${color}"
          class="bet" 
          type="number" 
          name="${color}" 
          id="${color}" 
          onchange="placeBet(this)" 
        />
    `;
});
const inputBets = document.querySelectorAll('.bet');
displayMoney.innerText = pocketMoney;

const placeBet = e => {
  if (e.value < 1) e.value = 0;
  bets[e.name] = Number(e.value);

  bets.total = 0;
  colors.forEach(color => {
    typeof bets[color] === 'number' ? (bets.total += bets[color]) : null;
  });

  displayMoney.innerText = pocketMoney - bets.total;
};

const rollColorBox = colorBox => {
  let currentColor = colors[Math.floor(Math.random() * 6)];
  colorBox.style.backgroundColor = currentColor;
  colorBox.setAttribute('data', currentColor);
};

const rollStart = () => {
  const result = [];
  const reset = () => {
    colorBoxs.forEach(box => {
      box.style.backgroundColor = 'rgb(223, 223, 223)';
      box.style.borderColor = 'rgb(122, 122, 122)';
    });
  };

  const showResult = () => {
    let won = 0;
    inputBets.forEach(inputBet => {
      const get = result.filter(e => e === inputBet.name);
      const getBet = Number(inputBet.value);
      if (get.length > 0) {
        won += getBet + getBet * get.length;
        inputBet.style.border = 'solid 3px gold';
        inputBet.style.borderRadius = '50%';
      }
    });
    pocketMoney += won;
    displayMoney.innerText = pocketMoney;
    console.log(`You won Points: ${won}`);
  };

  pocketMoney -= bets.total;
  reset();
  colorBoxs.forEach((box, index) => {
    const timer1 = setInterval(() => rollColorBox(box), 100);

    setTimeout(() => {
      clearInterval(timer1);
      box.style.borderColor = 'gold';
      result.push(box.getAttribute('data'));
      if (result.length >= 3) showResult();
    }, (index + 1) * 1000 + 1000);
  });
};

rollBtn.addEventListener('click', rollStart);
