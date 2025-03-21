export function init() {
    const form = document.getElementById('mortgage-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const price = parseFloat(document.getElementById('property-price').value);
        const downPayment = parseFloat(document.getElementById('down-payment').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100 / 12;
        const loanTerm = parseInt(document.getElementById('loan-term').value) * 12;
        const loanAmount = price - downPayment;
        const x = Math.pow(1 + interestRate, loanTerm);
        const monthlyPayment = (loanAmount * x * interestRate) / (x - 1);
        document.getElementById('result').innerHTML = `Monthly Payment: ZMW ${monthlyPayment.toFixed(2)}`;
    });
}