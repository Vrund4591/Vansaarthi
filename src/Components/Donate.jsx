import { useState } from 'react';
import Card from "./Card";

const Donate = ({ onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [qrCodeData, setQrCodeData] = useState(null);
  const [showQR, setShowQR] = useState(false);

  const predefinedAmounts = [100, 500, 1000];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount(amount.toString());
  };

  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    setCustomAmount(value);
    setSelectedAmount(parseFloat(value) || null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    
    try {
      const response = await fetch(`http://localhost:3000/api/qr-code/active?amount=${amount}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const qrData = await response.json();
      setQrCodeData(qrData.qrCodeUrl);
      setShowQR(true);
    } catch (error) {
      console.error('Error fetching QR code:', error);
      alert('Failed to generate QR code. Please try again.');
    }
  };

  return (
    <Card backgroundColor="bg-white" textColor="text-black" width="w-full max-w-[1200px] mx-auto">
      <div className="relative h-[90vh] overflow-y-auto p-4 md:p-8 lg:p-12">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 hover:bg-gray-100 p-1 transition-colors duration-200"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </button>

        <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Make a Donation</h2>
        
        {showQR ? (
          <div className="flex flex-col items-center w-fit mx-auto">
            <Card backgroundColor="bg-gray-50" textColor="text-black" flex="flex-col items-center">
            <img src={qrCodeData} alt="Payment QR Code" className="w-64 h-64" />
            </Card>
            <p className="text-lg font-semibold mt-6 mb-3">Scan to pay ₹{customAmount || selectedAmount}</p>
            <div className='flex flex-col items-center mt-4 space-y-4'>
            <Card backgroundColor="bg-orange-500" textColor="text-black">
            <button
              onClick={() => setShowQR(false)}
              className="mt-3 mb-3 w-full py-2 px-10 text-lg font-bold flex justify-center items-center" 
            >
              Back to Form
            </button>
          </Card>
          </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <Card backgroundColor="bg-gray-50" textColor="text-black">
              <div className="p-4 space-y-3 w-full">
                <label className="block text-md font-medium">Select Amount</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {predefinedAmounts.map((amount) => (
                    <Card key={amount}>
                      <button
                        type="button"
                        onClick={() => amount >= 0 && handleAmountSelect(amount)}
                        className={`w-full p-2.5 border-2 border-black transition-all ${
                          selectedAmount === amount 
                          ? 'bg-black text-white' 
                          : 'bg-white text-black hover:bg-gray-100'
                        }`}
                        disabled={amount < 0}
                      >
                        ₹{Math.max(0, amount)}
                      </button>
                    </Card>
                  ))}
                </div>
                <Card backgroundColor="bg-white" textColor="text-black">
                  <input
                    type="number"
                    min="0"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full p-2.5 focus:outline-none text-left pl-4 text-sm"
                    onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                  />
                </Card>
              </div>
            </Card>

            <div className="space-y-4">
              {[
                { label: "Full Name", name: "fullName", type: "text", placeholder: "Enter your full name" },
                { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
                { label: "Phone", name: "phone", type: "tel", placeholder: "Enter your phone number" }
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-md font-medium mb-1">{field.label}</label>
                  <Card backgroundColor="bg-gray-50" textColor="text-black">
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      required
                      className="w-full p-2.5 focus:outline-none bg-transparent text-left pl-4 text-sm"
                    />
                  </Card>
                </div>
              ))}

              <div>
                <label className="block text-md font-medium mb-1">Message (Optional)</label>
                <Card backgroundColor="bg-gray-50" textColor="text-black">
                  <textarea
                    name="message"
                    placeholder="Leave a message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-2.5 min-h-[100px] focus:outline-none bg-transparent text-left pl-4"
                  />
                </Card>
              </div>
            </div>

            <Card backgroundColor="bg-orange-500" textColor="text-black">
              <button 
                type="submit"
                className="w-full p-3 transition-colors text-base md:text-lg font-bold flex justify-center items-center"
              >
                Proceed to Pay
              </button>
            </Card>
          </form>
        )}
      </div>
    </Card>
  );
};

export default Donate;