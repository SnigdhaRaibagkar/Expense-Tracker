const text = document.getElementById('text');
const amount = document.getElementById('amount');
const list = document.getElementById('list');
const balance = document.getElementById('balance');
const Income= document.getElementById('income');
const Expense= document.getElementById('expense');

const incomeBtn = document.getElementById('incomeBtn');
const expenseBtn = document.getElementById('expenseBtn');
const filter=document.getElementById('filter');

//Load from local storage
let transactions = JSON.parse(localStorage.getItem("transactions"))|| [];

function addTransaction(type) {
    if (text.value.trim() === "" || amount.value === "") {
        alert("Please enter both description and amount");
        return;
    }

    const amtValue=parseFloat(amount.value);
    if (isNaN(amtValue) || amtValue <= 0) {
  alert("Please enter a valid amount");
  return;   
}

    let amt = Number(amount.value);

    if (type === "expense") {
        amt = -Math.abs(amt);
    } else {
        amt = Math.abs(amt);
    }

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: amt
    };

    transactions.push(transaction);
    
    updateLocalStorage();
    render();

    text.value = "";
    amount.value = "";
}

function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    render();
}

function render() {
    list.innerHTML = "";

    let total = 0;
    let income= 0;
    let expense=0;

     let filtered = transactions.filter(t => {
        if (filter.value === "income") return t.amount > 0;
        if (filter.value === "expense") return t.amount < 0;
        return true;
    });

    filtered.forEach(t => {
        total += t.amount;

         if (t.amount > 0) {
            income += t.amount;
        } else {
            expense += t.amount;
        }

        const li = document.createElement('li');
        li.classList.add(t.amount > 0 ? 'income' : 'expense');

       li.innerHTML = `
            <span class="text">${t.text}</span>

            <div class="right">
                <span class="amount">₹${Math.abs(t.amount)}</span>
                <button class="delete" onclick="deleteTransaction(${t.id})">✕</button>
            </div>
        `;

        list.appendChild(li);
    });

    balance.innerText = total;
    Income.innerText= income;
    Expense.innerText= expense;
}

incomeBtn.addEventListener('click', () => {
    addTransaction("income");
});

expenseBtn.addEventListener('click', () => {
    addTransaction("expense");
});

filter.addEventListener('change', render);

render();