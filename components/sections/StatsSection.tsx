const stats = [
  { value: '12,000+', label: 'Hours of Care Provided', icon: '⏱️' },
  { value: '95%', label: 'Patient Satisfaction Rate', icon: '⭐' },
  { value: '1,500+', label: 'Families Supported', icon: '👨‍👩‍👧‍👦' },
  { value: '120+', label: 'Certified Caregivers', icon: '👨‍⚕️' },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold mb-3" style={{ color: '#156CAF' }}>
            A few more facts about our care services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
            Trusted by professionals
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div 
                className="text-4xl font-bold mb-2"
                style={{ color: '#156CAF' }}
              >
                {s.value}
              </div>
              <div className="text-sm text-gray-600 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
