 const select = document.getElementById("fantasy");

  select.addEventListener("change", () => {
    const url = select.value;
    if (url) {
      window.location.href = url; // redirect to chosen site
    }
}
  )


  let count=0;
let diceroll = 0;

const diceid = document.getElementById("cube");

let record = document.querySelector(".record");
if (!record) {
  record = document.createElement("div");
  record.className = "record";
  diceid.parentElement.appendChild(record);
}


const updateRecord = () => {
  record.innerHTML = `Dice: ${diceroll} Count: ${count}`;
};

// Initialize localStorage with DiceData
const initializeData = () => {
  const storedData = localStorage.getItem("DiceData");
  if (storedData) {
    const data = JSON.parse(storedData);
   }
};
initializeData();

const change = () => {
  diceroll = Math.floor(Math.random() * 6) + 1;

  if (diceroll === 2) {
    diceid.innerHTML = `<div id="${diceroll}"><img height="150" src="https://tse3.mm.bing.net/th/id/OIP.3bGgjFweBB48SVlmr0VpdQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="2"></div>`;
  } else if (diceroll === 3) {
    diceid.innerHTML = `<div id="${diceroll}"><img height="150" src="https://tse1.explicit.bing.net/th/id/OIP.kWnZmfL7IN_sP3livgBNnQHaHU?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="3"></div>`;
  } else if (diceroll === 4) {
    diceid.innerHTML = `<div id="${diceroll}"><img height="150" src="https://tse1.explicit.bing.net/th/id/OIP.Udp1FQiYB2N3xe6tu_uwLQHaHU?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="4"></div>`;
  } else if (diceroll === 5) {
    diceid.innerHTML = `<div id="${diceroll}"><img height="150" src="https://tse1.explicit.bing.net/th/id/OIP.H_i4Y47W-QM9gTKOoBFSHwHaHU?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="5"></div>`;
  } else if (diceroll === 6) {
    diceid.innerHTML = `<div id="${diceroll}"><img height="150" src="https://tse1.mm.bing.net/th/id/OIP.XNtOQS89YX2kC1c3zV5HxwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3" alt="6"></div>`;
  } else if (diceroll === 1) {
    diceid.innerHTML = `<div id="${diceroll}"><img height="150" src="https://cdn.pixabay.com/photo/2014/04/03/10/24/one-338_1280.png" alt="1"></div>`;
  }
  updateRecord();
};

diceid.addEventListener("click", () => {
  count += 1;
  setTimeout(change, 1000);
// Store data in localStorage as DiceData
  localStorage.setItem("DiceData", JSON.stringify({count: count, dice: diceroll}));
  updateRecord();
});
   

updateRecord();




