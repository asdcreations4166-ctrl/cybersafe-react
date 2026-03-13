import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState('dark')
  const [navOpen, setNavOpen] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('cybersafe-theme')
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setTheme(prefersDark ? 'dark' : 'light')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('cybersafe-theme', newTheme)
  }

  const toggleNav = () => setNavOpen(!navOpen)

  const handleQuizChange = (question, answer) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }))
  }

  const submitQuiz = () => {
    setQuizSubmitted(true)
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
  }

  const correctAnswers = { q1: 'b', q2: 'b', q3: 'c' }
  const score = Object.keys(correctAnswers).filter(q => quizAnswers[q] === correctAnswers[q]).length

  return (
    <div className={`min-h-screen font-inter ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur-lg bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#home" className="flex items-center gap-3 font-bold text-xl">
            <span className="w-10 h-10 bg-gradient-to-br from-blue-400 to-orange-400 rounded-lg flex items-center justify-center text-lg shadow-lg">⚡</span>
            <span>CyberSafe</span>
          </a>
          <nav className="hidden md:flex gap-6">
            <a href="#threats" className="hover:text-blue-400 transition-colors duration-200">Threats</a>
            <a href="#tips" className="hover:text-blue-400 transition-colors duration-200">Safety Tips</a>
            <a href="#password" className="hover:text-blue-400 transition-colors duration-200">Passwords</a>
            <a href="#cases" className="hover:text-blue-400 transition-colors duration-200">Cases</a>
            <a href="#quiz" className="hover:text-blue-400 transition-colors duration-200">Quiz</a>
          </nav>
          <button onClick={toggleNav} className="md:hidden p-2 rounded-lg bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50">
            <i className={`fas ${navOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
          <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-200/80 dark:bg-gray-700/80 backdrop-blur-sm border border-gray-300/50 dark:border-gray-600/50 hover:bg-gray-300/80 dark:hover:bg-gray-600/80 transition-all duration-200">
            <i className="fas fa-moon"></i>
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <nav className="flex flex-col gap-4">
              <a href="#threats" onClick={() => setNavOpen(false)} className="hover:text-blue-400 transition-colors duration-200">Threats</a>
              <a href="#tips" onClick={() => setNavOpen(false)} className="hover:text-blue-400 transition-colors duration-200">Safety Tips</a>
              <a href="#password" onClick={() => setNavOpen(false)} className="hover:text-blue-400 transition-colors duration-200">Passwords</a>
              <a href="#cases" onClick={() => setNavOpen(false)} className="hover:text-blue-400 transition-colors duration-200">Cases</a>
              <a href="#quiz" onClick={() => setNavOpen(false)} className="hover:text-blue-400 transition-colors duration-200">Quiz</a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="py-20 bg-gradient-to-br from-blue-500/20 to-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="hero-title text-4xl md:text-6xl font-bold mb-4">Stay Secure. Stay Aware.</h1>
            <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
              Learn how to spot online threats, protect your passwords, and make smarter decisions on the web.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#threats" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl">Discover Threats</a>
              <a href="#tips" className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200">Get Safety Tips</a>
            </div>
          </div>
          <div className="text-center">
            <div className="w-48 h-60 sm:w-56 sm:h-70 md:w-64 md:h-80 mx-auto bg-gradient-to-br from-blue-400 to-orange-400 rounded-3xl flex items-center justify-center text-6xl sm:text-7xl md:text-8xl animate-pulse">
              🛡️
            </div>
          </div>
        </div>
      </section>

      {/* Threats */}
      <section id="threats" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-3xl font-bold text-center mb-4">Common Threats</h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">These are the most common cybersecurity issues people face every day.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'fa-person-fishing', title: 'Phishing', desc: 'Fraudulent messages designed to steal credentials or financial data. Always verify sender addresses and never click suspicious links.' },
              { icon: 'fa-bug', title: 'Malware', desc: 'Software that installs without consent and can steal info, damage files, or spy on you. Keep software updated and only install trusted apps.' },
              { icon: 'fa-id-badge', title: 'Identity Theft', desc: 'When someone uses your personal data to assume your identity. Protect sensitive documents and limit what you share online.' },
              { icon: 'fa-wifi-slash', title: 'Unsecured Networks', desc: 'Open public Wi‑Fi can expose your data. Use a VPN and avoid financial transactions on untrusted connections.' }
            ].map((threat, i) => (
              <div key={i} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-700/50">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-orange-100 dark:from-blue-900/50 dark:to-orange-900/50 rounded-lg flex items-center justify-center text-2xl mb-4">
                  <i className={`fas ${threat.icon}`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-2">{threat.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{threat.desc}</p>
                <a href="#" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">Learn more →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips */}
      <section id="tips" className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-3xl font-bold text-center mb-4">Safety Tips</h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">Small habits make a big difference. Try these rules to keep your digital life protected.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Think Before You Click', desc: 'Hover over links before you click, validate URLs, and be skeptical of urgent requests asking for credentials.' },
              { title: 'Update Often', desc: 'Software updates patch security issues. Enable auto‑updates for your devices and apps.' },
              { title: 'Use 2FA', desc: 'Two‑factor authentication adds an extra layer of protection even if a password is stolen.' },
              { title: 'Back Up Data', desc: 'Regular backups protect you from ransomware and accidental loss. Keep copies off‑site or in the cloud.' }
            ].map((tip, i) => (
              <div key={i} className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200/50 dark:border-gray-600/50">
                <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Password */}
      <section id="password" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-3xl font-bold text-center mb-4">Password Security</h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">Learn best practices for creating and managing strong passwords.</p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4">Strong Passwords</h3>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Use unique passphrases of 12+ characters.</li>
                <li>Include a mix of letters, numbers, and symbols.</li>
                <li>Avoid common words and personal info.</li>
              </ul>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4">Password Managers</h3>
              <p className="text-gray-600 dark:text-gray-300">A manager generates and stores complex passwords so you don't have to memorize them. Choose reputable, audited tools.</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <h3 className="text-xl font-semibold mb-4">Reuse Risks</h3>
              <p className="text-gray-600 dark:text-gray-300">Reusing passwords across sites means one breach can compromise multiple accounts. Change passwords after a leak.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Cases */}
      <section id="cases" className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-3xl font-bold text-center mb-4">Real‑Life Cases</h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">These short scenarios highlight what can happen when security is ignored.</p>
          <div className="space-y-4">
            {[
              { title: 'CEO Fraud: $100K Wire Transfer', desc: 'A finance team received an email appearing to be from the CEO asking for an urgent wire transfer. The email was spoofed, and the funds were moved to an attacker\'s account before the fraud was discovered.', tip: 'Always verify unusual requests via a second channel (call or in‑person) before sending money.' },
              { title: 'Password Reuse Leads to Account Takeover', desc: 'After a data breach, attackers used leaked credentials to log into the victim\'s bank account and transfer funds. The password had been reused across multiple services.', tip: 'Use a password manager and change compromised credentials immediately.' },
              { title: 'Public Wi‑Fi Sniffing', desc: 'A user connected to an unencrypted coffee shop network and entered login details into a fake portal. The attacker captured the credentials and used them to access the user\'s accounts.', tip: 'Use a VPN and avoid logging into sensitive sites on public networks.' },
              { title: 'Ransomware Attack on a Small Business', desc: 'A small business opened an invoice attachment that contained ransomware. The network was encrypted, and attackers demanded payment to restore access.', tip: 'Keep backups offline and never open attachments from unknown senders.', link: 'https://www.cisa.gov/ransomware' }
            ].map((case_, i) => (
              <details key={i} className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-600/50">
                <summary className="cursor-pointer font-semibold text-lg">{case_.title}</summary>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{case_.desc}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400"><strong>Tip:</strong> {case_.tip}</p>
                {case_.link && <a href={case_.link} target="_blank" rel="noopener" className="text-blue-500 hover:text-blue-600 transition-colors duration-200">Learn more</a>}
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-3xl font-bold text-center mb-4">Quick Quiz</h2>
          <p className="text-center mb-12 text-gray-600 dark:text-gray-300">Test your cyber smarts with a short multiple-choice quiz.</p>
          <form onSubmit={(e) => { e.preventDefault(); submitQuiz(); }} className="space-y-6">
            {[
              { q: 'q1', question: 'Which is the best way to check if a link is safe?', options: ['Click it and see what happens', 'Hover to view the URL before clicking', 'Only click links from unknown senders'], correct: 'b' },
              { q: 'q2', question: 'What is the best reason to use a password manager?', options: ['So I don\'t have to remember any passwords', 'To generate and store unique passwords securely', 'To share passwords with friends easily'], correct: 'b' },
              { q: 'q3', question: 'If an email says your account is locked and demands immediate action, what should you do?', options: ['Follow the link in the email right away', 'Call the support number in the email', 'Visit the site directly by typing the address yourself'], correct: 'c' }
            ].map((item, i) => (
              <div key={i} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <p className="font-semibold mb-4">{i+1}. {item.question}</p>
                <div className="space-y-2">
                  {item.options.map((opt, j) => {
                    const value = String.fromCharCode(97 + j)
                    return (
                      <label key={j} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200 ${quizSubmitted && value === item.correct ? 'bg-green-100 dark:bg-green-900 border-green-500' : quizSubmitted && quizAnswers[item.q] === value && value !== item.correct ? 'bg-red-100 dark:bg-red-900 border-red-500' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                        <input type="radio" name={item.q} value={value} onChange={() => handleQuizChange(item.q, value)} required />
                        {opt}
                      </label>
                    )
                  })}
                </div>
              </div>
            ))}
            <div className="flex gap-4 justify-center">
              <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition">Submit answers</button>
              <button type="button" onClick={resetQuiz} className="border border-gray-300 dark:border-gray-600 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">Try again</button>
            </div>
            {quizSubmitted && (
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg text-center shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                <p className="text-lg font-semibold">You scored {score} out of {Object.keys(correctAnswers).length}.</p>
                <p className="text-gray-600 dark:text-gray-300">{score === 3 ? 'Excellent! You have a strong security sense.' : 'Nice try — revisit the tips above and try again!'}</p>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/95 backdrop-blur-sm text-white py-8 border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-2">CyberSafe</h3>
            <p className="text-gray-400">Crafted to help everyday users build smarter, safer habits online.</p>
          </div>
          <nav className="grid grid-cols-2 gap-4">
            <a href="#threats" className="hover:text-blue-400 transition-colors duration-200">Threats</a>
            <a href="#tips" className="hover:text-blue-400 transition-colors duration-200">Tips</a>
            <a href="#password" className="hover:text-blue-400 transition-colors duration-200">Passwords</a>
            <a href="#cases" className="hover:text-blue-400 transition-colors duration-200">Cases</a>
            <a href="#quiz" className="hover:text-blue-400 transition-colors duration-200">Quiz</a>
          </nav>
        </div>
        <div className="max-w-6xl mx-auto px-4 mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
          © 2026 CyberSafe. Designed for awareness and education.
        </div>
      </footer>
    </div>
  )
}

export default App
