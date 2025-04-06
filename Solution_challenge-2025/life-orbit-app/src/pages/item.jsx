import React, { useState } from 'react';

const ChequeSimulation = () => {
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [amountWords, setAmountWords] = useState('');
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [signature, setSignature] = useState('');
  const [isFilled, setIsFilled] = useState(false);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) { // Allow only numbers with 2 decimal places
      setAmount(value);
      if (value) {
        setAmountWords(numberToWords(parseFloat(value)));
      } else {
        setAmountWords('');
      }
    }
  };

  // Simple number to words converter (for demonstration)
  const numberToWords = (num) => {
    const units = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 
                  'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', 'Ten', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 
                'Eighty', 'Ninety'];

    if (num === 0) return 'Zero';
    if (num < 10) return units[num];
    if (num < 20) return teens[num - 10];
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ' ' + units[num % 10] : '');
    
    return num.toFixed(2); // Fallback for numbers >= 100
  };

  const handleSubmit = () => {
    if (payee && amount && date && signature) {
      setIsFilled(true);
    } else {
      alert('Please fill all fields');
    }
  };

  const resetCheque = () => {
    setPayee('');
    setAmount('');
    setAmountWords('');
    setDate(new Date().toLocaleDateString());
    setSignature('');
    setIsFilled(false);
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Cheque Writing Simulation</h1>
      
      <div style={{ 
        position: 'relative',
        border: '1px solid #ccc',
        padding: '20px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        {/* SVG Cheque Template */}
        <svg width="100%" height="400px" viewBox="0 0 800 400" style={{ backgroundColor: 'white' }}>
          {/* Cheque outline */}
          <rect x="10" y="10" width="780" height="380" fill="none" stroke="#333" strokeWidth="2" rx="5" ry="5"/>
          
          {/* Bank details */}
          <text x="20" y="40" fontFamily="Courier New" fontSize="18" fontWeight="bold">BANK OF REACT</text>
          <text x="20" y="70" fontFamily="Courier New" fontSize="14">123 Main Street, Reactville</text>
          
          {/* Date */}
          <text x="650" y="40" fontFamily="Courier New" fontSize="14">Date:</text>
          <rect x="690" y="25" width="90" height="20" fill="none" stroke="#ccc" />
          <text x="695" y="40" fontFamily="Courier New" fontSize="14">{date}</text>
          
          {/* Payee line */}
          <text x="20" y="110" fontFamily="Courier New" fontSize="14">Pay to the order of:</text>
          <rect x="180" y="95" width="400" height="25" fill="none" stroke="#ccc" />
          <text x="185" y="110" fontFamily="Courier New" fontSize="14" fill={payee ? '#000' : '#999'}>
            {payee || 'Payee Name'}
          </text>
          
          {/* Amount box */}
          <text x="20" y="150" fontFamily="Courier New" fontSize="14">Amount: $</text>
          <rect x="100" y="135" width="150" height="25" fill="none" stroke="#ccc" />
          <text x="105" y="150" fontFamily="Courier New" fontSize="14" fill={amount ? '#000' : '#999'}>
            {amount || '0.00'}
          </text>
          
          {/* Amount in words */}
          <text x="20" y="190" fontFamily="Courier New" fontSize="14">In words:</text>
          <rect x="100" y="175" width="500" height="25" fill="none" stroke="#ccc" />
          <text x="105" y="190" fontFamily="Courier New" fontSize="14" fill={amountWords ? '#000' : '#999'}>
            {amountWords || 'Zero dollars'}
          </text>
          
          {/* Signature line */}
          <line x1="500" y1="350" x2="700" y2="350" stroke="#333" strokeWidth="1" strokeDasharray="5,5" />
          <text x="550" y="340" fontFamily="Courier New" fontSize="14" textAnchor="middle">Authorized Signature</text>
          <text x="550" y="370" fontFamily="Courier New" fontSize="14" textAnchor="middle" 
                fontStyle="italic" fill={signature ? '#000' : '#999'}>
            {signature || 'Your Signature'}
          </text>
          
          {/* Memo line (optional) */}
          <text x="20" y="230" fontFamily="Courier New" fontSize="14">Memo:</text>
          <rect x="80" y="215" width="200" height="25" fill="none" stroke="#ccc" />
        </svg>

        {!isFilled ? (
          <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0' }}>
            <h3>Fill Out Cheque</h3>
            <div style={{ marginBottom: '10px' }}>
              <label>Payee Name: </label>
              <input 
                type="text" 
                value={payee} 
                onChange={(e) => setPayee(e.target.value)}
                style={{ padding: '5px', width: '300px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Amount ($): </label>
              <input 
                type="text" 
                value={amount} 
                onChange={handleAmountChange}
                placeholder="0.00"
                style={{ padding: '5px', width: '100px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Date: </label>
              <input 
                type="text" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
                style={{ padding: '5px', width: '100px' }}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>Signature: </label>
              <input 
                type="text" 
                value={signature} 
                onChange={(e) => setSignature(e.target.value)}
                style={{ padding: '5px', width: '200px' }}
              />
            </div>
            <button 
              onClick={handleSubmit}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Submit Cheque
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <h3 style={{ color: '#4CAF50' }}>Cheque Completed!</h3>
            <p>Payee: {payee}</p>
            <p>Amount: ${amount} ({amountWords} dollars)</p>
            <p>Date: {date}</p>
            <button 
              onClick={resetCheque}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '10px'
              }}
            >
              Write Another Cheque
            </button>
          </div>
        )}
      </div>

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#e8f4f8' }}>
        <h3>Cheque Writing Tips:</h3>
        <ul>
          <li>Write the payee's name clearly</li>
          <li>Always write the amount in both numbers and words</li>
          <li>Use the current date unless post-dating</li>
          <li>Sign exactly as your bank has on record</li>
          <li>Draw a line after the amount words to prevent alteration</li>
        </ul>
      </div>
    </div>
  );
};

export default ChequeSimulation;
