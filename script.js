const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');
const balance = document.getElementById('balance');

const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');

let transactions = [];

function addTransaction(type) {
    if (text.value === "" || amount.value === "") {
        alert("Please enter both description and amount");
        return;
    }

    let amt = Number(amount.value);

    if (type === "expense") {
        amt = -Math.abs(amt);
    } else {
        amt = Math.abs(amt);
    }

    const transaction = {
        text: text.value,
        amount: amt
    };

    transactions.push(transaction);

    render();

    text.value = "";
    amount.value = "";
}

function render() {
    list.innerHTML = "";

    let total = 0;

    transactions.forEach(t => {
        total += t.amount;

        const li = document.createElement('li');

        li.innerHTML = `
            ${t.text} 
            <span>₹${Math.abs(t.amount)}</span>
        `;

        list.appendChild(li);
    });

    balance.innerText = total;
}

incomeBtn.addEventListener('click', () => {
    addTransaction("income");
});

expenseBtn.addEventListener('click', () => {
    addTransaction("expense");
});

render();