'use client';

import { useState } from 'react';
import { ArrowLeft, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ApplyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    address: '',
    education_level: '',
    experience_years: '',
    previous_experience: '',
    certifications: '',
    availability: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const form = e.currentTarget;
      const formDataToSend = new FormData(form);

      const response = await fetch('/api/job-applications', {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Reset form
        setFormData({
          full_name: '',
          email: '',
          phone: '',
          date_of_birth: '',
          address: '',
          education_level: '',
          experience_years: '',
          previous_experience: '',
          certifications: '',
          availability: '',
        });
        setFileName('');
        form.reset();
      } else {
        setError(result.error || 'Failed to submit application');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-white py-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: '#267ABA' }}>
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Application Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-8">
              Thank you for applying to join our team at AGCR. We have received your application 
              and will review it shortly. We'll contact you via email or phone if your qualifications 
              match our current openings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <button
                onClick={() => setSuccess(false)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white font-semibold rounded-lg transition-all"
                style={{ backgroundColor: '#267ABA' }}
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Apply to Become a Caregiver
          </h1>
          <p className="text-gray-600 text-lg">
            Join our team of professional caregivers at All Generations Care and Companionship Rwanda. 
            Fill out the form below and upload your CV to apply.
          </p>
        </div>

        {/* Application Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Personal Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="full_name" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder:text-gray-400 bg-transparent"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder:text-gray-400 bg-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder:text-gray-400 bg-transparent"
                  placeholder="+250 XXX XXX XXX"
                />
              </div>

              <div>
                <label htmlFor="date_of_birth" className="block text-sm font-semibold text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="date_of_birth"
                  name="date_of_birth"
                  value={formData.date_of_birth}
                  onChange={handleChange}
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder:text-gray-400 bg-transparent"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder:text-gray-400 bg-transparent"
                  placeholder="City, District, Rwanda"
                />
              </div>
            </div>
          </div>

          {/* Qualifications */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Qualifications & Experience</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="education_level" className="block text-sm font-semibold text-gray-700 mb-2">
                  Education Level
                </label>
                <select
                  id="education_level"
                  name="education_level"
                  value={formData.education_level}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                >
                  <option value="">Select education level</option>
                  <option value="High School">High School</option>
                  <option value="Certificate">Certificate</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="experience_years" className="block text-sm font-semibold text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  id="experience_years"
                  name="experience_years"
                  value={formData.experience_years}
                  onChange={handleChange}
                  min="0"
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder:text-gray-400 bg-transparent"
                  placeholder="0"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="previous_experience" className="block text-sm font-semibold text-gray-700 mb-2">
                  Previous Experience
                </label>
                <textarea
                  id="previous_experience"
                  name="previous_experience"
                  value={formData.previous_experience}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder:text-gray-400 bg-transparent"
                  placeholder="Describe your previous caregiving or healthcare experience..."
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="certifications" className="block text-sm font-semibold text-gray-700 mb-2">
                  Certifications
                </label>
                <textarea
                  id="certifications"
                  name="certifications"
                  value={formData.certifications}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-0 py-2.5 border-0 border-b-2 border-gray-300 focus:outline-none focus:border-gray-900 text-gray-900 placeholder:text-gray-400 bg-transparent"
                  placeholder="List any relevant certifications (e.g., First Aid, CPR, Nursing Assistant)..."
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="availability" className="block text-sm font-semibold text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                >
                  <option value="">Select your availability</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Weekends">Weekends Only</option>
                  <option value="Flexible">Flexible</option>
                </select>
              </div>
            </div>
          </div>

          {/* CV Upload */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Your CV</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <label htmlFor="cv_file" className="cursor-pointer">
                <span className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Click to upload
                </span>
                <span className="text-sm text-gray-600"> or drag and drop</span>
                <input
                  type="file"
                  id="cv_file"
                  name="cv_file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-2">PDF, DOC, or DOCX (MAX. 5MB)</p>
              {fileName && (
                <p className="text-sm text-green-600 font-semibold mt-3">
                  ✓ {fileName}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 px-6 text-white font-semibold rounded-lg transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#267ABA' }}
            >
              {loading ? 'Submitting...' : 'Submit Application'}
            </button>
            <Link
              href="/"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
