import React, { useState } from 'react';
import { Check, User, Truck, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

const steps = [
  { id: 1, name: 'Personal Details', icon: User },
  { id: 2, name: 'Vehicle Info', icon: Truck },
  { id: 3, name: 'Bank Details', icon: CreditCard },
];

export default function DriverOnboarding() {
  const { drivers, addDriver } = useAppContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    phone: '',
    aadharNumber: '',
    address: '',
    // Step 2
    vehicleNumber: '',
    vehicleType: 'Toto',
    preferredRoute: '',
    // Step 3
    accountName: '',
    accountNumber: '',
    ifscCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
      if (!formData.phone.trim() || !/^\+?[0-9]{10,12}$/.test(formData.phone.replace(/\s+/g, ''))) {
        newErrors.phone = 'Valid phone number is required';
      }
      if (!formData.aadharNumber.trim() || formData.aadharNumber.length < 12) {
        newErrors.aadharNumber = 'Valid Aadhar/ID number is required';
      }
      if (!formData.address.trim()) newErrors.address = 'Address is required';
    } 
    else if (step === 2) {
      if (!formData.vehicleNumber.trim()) newErrors.vehicleNumber = 'Vehicle Registration Number is required';
      if (!formData.preferredRoute.trim()) newErrors.preferredRoute = 'Preferred Route is required';
    }
    else if (step === 3) {
      if (!formData.accountName.trim()) newErrors.accountName = 'Account Holder Name is required';
      if (!formData.accountNumber.trim() || formData.accountNumber.length < 8) {
        newErrors.accountNumber = 'Valid Account Number is required';
      }
      if (!formData.ifscCode.trim() || formData.ifscCode.length < 11) {
        newErrors.ifscCode = 'Valid IFSC Code is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      // Add to context
      const newDriver = {
        id: `D00${drivers.length + 1}`,
        name: formData.fullName,
        phone: formData.phone,
        route: formData.preferredRoute,
        status: 'active' as const,
        earnings: 0,
        rating: 5.0
      };
      addDriver(newDriver);

      console.log('Form submitted:', formData);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Onboarding Complete!</h2>
        <p className="text-gray-500 mb-6">
          {formData.fullName} has been successfully registered as a driver. They will receive an SMS with their login details shortly.
        </p>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setCurrentStep(1);
            setFormData({
              fullName: '', phone: '', aadharNumber: '', address: '',
              vehicleNumber: '', vehicleType: 'Toto', preferredRoute: '',
              accountName: '', accountNumber: '', ifscCode: '',
            });
          }}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
        >
          Onboard Another Driver
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Driver Onboarding</h1>
        <p className="text-gray-500 mt-1">Register a new driver to the RouteVoice network.</p>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 rounded-full -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full -z-10 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                  isCompleted ? 'bg-blue-600 border-blue-600 text-white' : 
                  isCurrent ? 'bg-white border-blue-600 text-blue-600' : 
                  'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                </div>
                <span className={`mt-2 text-xs font-medium ${
                  isCurrent || isCompleted ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 sm:p-8">
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Personal Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Full Name</label>
                  <input 
                    type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g. Raju Das"
                  />
                  {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input 
                    type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="+91 9876543210"
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Aadhar / ID Number</label>
                  <input 
                    type="text" name="aadharNumber" value={formData.aadharNumber} onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.aadharNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="12-digit Aadhar number"
                  />
                  {errors.aadharNumber && <p className="text-xs text-red-500">{errors.aadharNumber}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Full Address</label>
                  <textarea 
                    name="address" value={formData.address} onChange={handleInputChange} rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="House no, Street, City, State, PIN"
                  />
                  {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Vehicle Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Vehicle Type</label>
                  <select 
                    name="vehicleType" value={formData.vehicleType} onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  >
                    <option value="Toto">Toto (E-Rickshaw)</option>
                    <option value="Auto">Auto Rickshaw</option>
                    <option value="Cab">Local Cab</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Vehicle Registration Number</label>
                  <input 
                    type="text" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase ${errors.vehicleNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="WB 01 AB 1234"
                  />
                  {errors.vehicleNumber && <p className="text-xs text-red-500">{errors.vehicleNumber}</p>}
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Preferred Route</label>
                  <input 
                    type="text" name="preferredRoute" value={formData.preferredRoute} onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.preferredRoute ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g. Station to Main Market"
                  />
                  {errors.preferredRoute && <p className="text-xs text-red-500">{errors.preferredRoute}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-3">Bank Details for Payouts</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Account Holder Name</label>
                  <input 
                    type="text" name="accountName" value={formData.accountName} onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.accountName ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Name as per bank records"
                  />
                  {errors.accountName && <p className="text-xs text-red-500">{errors.accountName}</p>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Account Number</label>
                  <input 
                    type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="Account Number"
                  />
                  {errors.accountNumber && <p className="text-xs text-red-500">{errors.accountNumber}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">IFSC Code</label>
                  <input 
                    type="text" name="ifscCode" value={formData.ifscCode} onChange={handleInputChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase ${errors.ifscCode ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder="e.g. SBIN0001234"
                  />
                  {errors.ifscCode && <p className="text-xs text-red-500">{errors.ifscCode}</p>}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-700 hover:bg-gray-200 bg-white border border-gray-300'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back
          </button>
          
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
            >
              <Check className="w-4 h-4 mr-1" />
              Complete Onboarding
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
