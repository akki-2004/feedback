
import { useState, useEffect } from 'react'

const App = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [feedbacks, setFeedbacks] = useState([])
  const [loading, setLoading] = useState(false)
  const [showFeedbacks, setShowFeedbacks] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const fetchFeedbacks = async () => {
    const res = await fetch('/api/feedback')
    const data = await res.json()
    setFeedbacks(data)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    setLoading(false)
    setForm({ name: '', email: '', message: '' })
    fetchFeedbacks()
  }

  useEffect(() => {
    if (showFeedbacks) fetchFeedbacks()
  }, [showFeedbacks])

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">Feedback Collector</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input required name="name" placeholder="Full Name" value={form.name} onChange={handleChange}
          className="w-full border p-2 rounded" />
        <input required type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}
          className="w-full border p-2 rounded" />
        <textarea required name="message" placeholder="Your Feedback" value={form.message} onChange={handleChange}
          className="w-full border p-2 rounded" />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
      <button onClick={() => setShowFeedbacks(!showFeedbacks)} className="mt-6 underline text-sm">
        {showFeedbacks ? 'Hide' : 'View'} Submitted Feedbacks
      </button>
      {showFeedbacks && feedbacks.map((f, i) => (
        <div key={i} className="mt-4 p-4 border rounded text-left shadow">
          <p><strong>{f.name}</strong> ({f.email})</p>
          <p>{f.message}</p>
          <small className="text-gray-500">{new Date(f.timestamp).toLocaleString()}</small>
        </div>
      ))}
      <footer className="mt-8 text-xs text-gray-400">
        Built by Your Name - MERN Stack Submission
      </footer>
    </div>
  )
}

export default App
