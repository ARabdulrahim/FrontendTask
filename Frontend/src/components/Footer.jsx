import React from 'react'

function Footer() {
  return (
    <footer className="mt-24 pt-12 border-t border-slate-900 text-center">
          <div className="flex justify-center gap-8 mb-8 text-slate-500 text-sm">
             <a href="#" className="hover:text-white">Twitter</a>
             <a href="#" className="hover:text-white">Discord</a>
             <a href="#" className="hover:text-white">Docs</a>
          </div>
          <p className="text-slate-600 text-xs uppercase tracking-widest">© 2026 PrimeTrade Intelligence Labs.</p>
    </footer>
  )
}

export default Footer
