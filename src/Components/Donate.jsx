import { useState } from 'react';
import Card from "./Card";

const handleCustomAmountChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setCustomAmount(value);
  };
const Donate = ({ onClose }) => {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = customAmount || selectedAmount;
    console.log('Donation details:', { amount, ...formData });
  };

  return (
    <Card backgroundColor="bg-white" textColor="text-black" width="w-1200px">
      <div className="relative p-20 py-8 px-[500] h-full">
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

        <h2 className="text-2xl font-bold mb-6 ">Make a Donation</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6 gap-4">
          <Card backgroundColor="bg-gray-50" textColor="text-black" >
            <div className="p-4 space-y-3 w-full px-24 gap-4">
              <label className="block text-md font-medium">Select Amount</label>
              <div className="grid grid-cols-3 gap-8">
  {predefinedAmounts.map((amount) => (
    <Card>
    <button
      key={amount}
      type="button"
      onClick={() => amount >= 0 && handleAmountSelect(amount)}
      className={`p-2.5 border-2 border-black transition-all ${
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
              <Card backgroundColor="bg-white" textColor="text-black" >
           
<input
  type="number"
  min="0"
  placeholder="Enter custom amount"
  value={customAmount}
  onChange={handleCustomAmountChange}
  className="w-full p-2.5 focus:outline-none px-24 text-left pl-4 text-sm"
  onKeyDown={(e) => {
    if (e.key === '-') {
      e.preventDefault();
    }
  }}
/>
              </Card>
            </div>
          </Card>

          <div className="space-y-4 ">
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
                    className="w-full p-2.5 focus:outline-none bg-transparent px-72 text-left pl-4 text-sm "
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
                  className="w-full p-2.5 min-h-[100px] focus:outline-none bg-transparent px-64 text-left pl-4"
                />
              </Card>
            </div>
          </div>

          <Card backgroundColor="bg-orange-500" textColor="text-black">
  <button 
    type="submit"
    className="w-full p-3  transition-colors text-lg font-bold inline-flex justify-center items-center px-40 mx-3
    "
  >
    Proceed to Pay
  </button>
</Card>
        </form>
      </div>
    </Card>
  );
};

export default Donate;