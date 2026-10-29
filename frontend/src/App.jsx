import React, { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Heart, MapPin, Menu, MessageCircle, Search, Sparkles, X } from 'lucide-react'
import { categories, contacts, products, store, WHATSAPP_NUMBER } from './data'

const waLink = (message, number = WHATSAPP_NUMBER) => `https://wa.me/${number}?text=${encodeURIComponent(message)}`

function BrandMark() {
  return <a className="brand" href="#home" aria-label="Jawad Handlooms home">
    <span className="brand-icon">ஜ</span>
    <span><strong>JAWAD</strong><small>HANDLOOMS</small></span>
  </a>
}

export default function App() {
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [saved, setSaved] = useState([])
  const [selected, setSelected] = useState(null)
  const [toast, setToast] = useState('')

  const filtered = useMemo(() => products.filter(p =>
    (category === 'All' || p.category === category) &&
    `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ), [category, search])

  const toggleSaved = id => setSaved(old => old.includes(id) ? old.filter(x => x !== id) : [...old, id])
  const enquire = product => window.open(waLink(`Hello Jawad Handlooms! I would like to enquire about ${product.name}. Please share available colours, sizes and the latest price.`), '_blank', 'noopener,noreferrer')
  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(store.address)
      setToast('Store address copied')
    } catch {
      setToast(store.address)
    }
    window.setTimeout(() => setToast(''), 2800)
  }

  return <div id="home">
    <div className="announcement"><span>✦</span> Woven with heritage. Chosen with love. <span className="announcement-link">Visit us in Shivajinagar, Bengaluru <ArrowUpRight size={13}/></span></div>
    <header className="header"><div className="nav-shell">
      <BrandMark/>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#collections" onClick={() => setMenuOpen(false)}>Collections</a>
        <a href="#story" onClick={() => setMenuOpen(false)}>Our story</a>
        <a href="#visit" onClick={() => setMenuOpen(false)}>Visit our store</a>
      </nav>
      <div className="nav-actions">
        <a className="nav-whatsapp" href={waLink('Hello Jawad Handlooms! Please share your latest handloom collection.')} target="_blank" rel="noreferrer"><MessageCircle size={16}/> WhatsApp us</a>
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
    </div></header>

    <main>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> HANDWOVEN TEXTILES FOR YOUR HOME</div>
          <h1>Bring home the beauty<br/>of <em>Indian handlooms.</em></h1>
          <p className="hero-sub">Discover handwoven bedsheets, cushion covers, curtains, quilts and everyday home linens inspired by India's rich textile traditions.</p>
          <div className="hero-buttons"><a href="#collections" className="button button-dark">Explore collections <ArrowRight size={17}/></a><a href="#visit" className="button button-quiet">Find our store <MapPin size={16}/></a></div>
          <div className="hero-proof"><div className="proof-icon"><Sparkles size={19}/></div><div><strong>Natural textures.</strong><span>Comfort for everyday living.</span></div><div className="proof-divider"/><div><strong>Made for your home</strong><span>Thoughtful textiles for every room.</span></div></div>
          <span className="hero-stamp">A LITTLE<br/>INDIAN<br/><b>HERITAGE</b></span>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1300&q=90" alt="Handloom-inspired bedding and warm home furnishings"/></div>
          <div className="hero-floating-card"><span className="floating-flower">✿</span><div><small>THE JAWAD EDIT</small><strong>Elegance that<br/>never fades.</strong></div></div>
          <div className="hero-side-note">TEXTURE · COLOUR · CULTURE</div><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
        </div>
      </section>

      <section className="value-strip" aria-label="Store highlights">
        <div><span className="value-icon"><Sparkles/></span><p><strong>Handloom home essentials</strong><small>Timeless textiles for every room</small></p></div>
        <div><span className="value-icon"><Heart/></span><p><strong>Craft-inspired designs</strong><small>Bring warmth and character home</small></p></div>
        <div><span className="value-icon"><MessageCircle/></span><p><strong>Personal assistance</strong><small>Enquire directly on WhatsApp</small></p></div>
        <div><span className="value-icon"><MapPin/></span><p><strong>Visit us in Bengaluru</strong><small>Shivajinagar, Bengaluru</small></p></div>
      </section>

      <section id="collections" className="collections section-wrap">
        <div className="section-heading"><div><div className="eyebrow"><span className="eyebrow-line"/> FIND YOUR FAVOURITE</div><h2>Handloom essentials for <em>every corner.</em></h2><p>From restful bedrooms to welcoming living spaces, discover textiles that bring comfort, colour and character into your home.</p></div><a href="#visit" className="text-link">Need help choosing? <ArrowUpRight size={16}/></a></div>
        <div className="collection-tools">
          <div className="filters" role="group" aria-label="Filter products">{categories.map(c => <button key={c} className={category === c ? 'filter active' : 'filter'} onClick={() => setCategory(c)}>{c}</button>)}</div>
          <label className="search-box"><Search size={17}/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search the collection..." aria-label="Search products"/>{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={15}/></button>}</label>
        </div>
        <div className="product-grid">{filtered.map((product, i) => <article className="product-card" key={product.id}>
          <button className="product-image" onClick={() => setSelected(product)} aria-label={`View ${product.name}`}>
            <img src={product.image} alt={product.name} loading={i > 3 ? 'lazy' : 'eager'} onError={e => { e.currentTarget.src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=85' }}/>
            <span className={`product-tag ${product.tone}`}>{product.tag}</span><span className="quick-view">Quick view <ArrowUpRight size={14}/></span>
          </button>
          <div className="product-info"><div><span className="product-category">{product.category}</span><h3>{product.name}</h3></div><button className={saved.includes(product.id) ? 'save-btn saved' : 'save-btn'} onClick={() => toggleSaved(product.id)} aria-label={saved.includes(product.id) ? 'Remove from wishlist' : 'Save to wishlist'}><Heart size={17} fill={saved.includes(product.id) ? 'currentColor' : 'none'}/></button></div>
          <p className="product-description">{product.description}</p><div className="product-bottom"><span className="availability-note"><Sparkles size={13}/> Ask about colours & availability</span><button className="enquire-btn" onClick={() => enquire(product)}>Enquire <ArrowUpRight size={15}/></button></div>
        </article>)}</div>
        {filtered.length === 0 && <div className="empty-state"><Search size={25}/><h3>No matching pieces found</h3><p>Try a different search or select another category.</p><button className="button button-dark" onClick={() => {setCategory('All');setSearch('')}}>Show all collections</button></div>}
      </section>

      <section className="story-section" id="story">
        <div className="story-image"><img src="https://images.unsplash.com/photo-1605289355680-75fb412e7b8a?auto=format&fit=crop&w=1100&q=85" alt="Colourful woven fabric textures" loading="lazy"/><div className="story-image-label"><span>✳</span> THE BEAUTY IS IN THE DETAILS</div></div>
        <div className="story-copy"><div className="eyebrow"><span className="eyebrow-line"/> OUR PHILOSOPHY</div><h2>Tradition in every weave.<br/><em>Comfort in every room.</em></h2><p>Beautiful homes begin with thoughtful details: soft cotton, rich woven textures, and colours that make every room feel welcoming.</p><p>At Jawad Handlooms, discover home furnishings inspired by India's textile traditions—from bedding and curtains to cushions, dhurries and everyday linens.</p><a className="button button-dark" href={waLink('Hello Jawad Handlooms! I would love to know more about your collections.')} target="_blank" rel="noreferrer">Find your home textiles <ArrowRight size={17}/></a><div className="story-signature">The Jawad Handlooms team <span>♥</span></div></div>
      </section>

      <section className="visit-section section-wrap" id="visit">
        <div className="visit-intro"><div className="eyebrow"><span className="eyebrow-line"/> COME SAY HELLO</div><h2>Your next favourite<br/>is waiting <em>for you.</em></h2><p>Visit our store in the heart of Shivajinagar, Bengaluru, or message us to enquire about a collection.</p><a className="button button-dark" href="https://www.google.com/maps/dir/?api=1&destination=No.%2049%2C%20Thoppe%20Mudaliar%20Street%2C%20OPH%20Road%20Cross%2C%20Shivajinagar%2C%20Bengaluru%20560051&travelmode=driving" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={16}/></a></div>
        <div className="contact-card"><div className="contact-card-top"><div className="contact-pin"><MapPin size={22}/></div><div><span className="product-category">OUR STORE</span><h3>Jawad Handlooms</h3></div></div>
          <p className="address">{store.address}</p><div className="store-map"><iframe title="Jawad Handlooms location on Google Maps" src={`https://maps.google.com/maps?q=${encodeURIComponent(store.address)}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen /></div><a className="map-directions-link" href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address)}&travelmode=driving`} target="_blank" rel="noreferrer"><MapPin size={16}/> Open Google Maps & get directions <ArrowUpRight size={15}/></a><button className="copy-address" onClick={copyAddress}>Copy address <ArrowDown size={14}/></button><div className="contact-divider"/><span className="product-category">TALK TO OUR TEAM</span>
          <div className="contact-list">{contacts.map(person => <div className="contact-person" key={person.name}><div className="person-avatar">{person.name[0]}</div><div className="person-data"><strong>{person.name}</strong><a href={`tel:${person.phone}`}>{person.phone}</a></div><a className="contact-whatsapp" href={waLink(`Hello ${person.name}, I am enquiring about Jawad Handlooms.`,person.whatsapp)} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${person.name}`}><MessageCircle size={17}/></a></div>)}</div>
          <a className="full-whatsapp" href={waLink('Hello Jawad Handlooms! Please share your latest catalogue and store details.')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> Chat with Jawad Handlooms <ArrowRight size={16}/></a>
        </div>
      </section>

      <section className="closing-banner"><div className="closing-flower">✿</div><div><span>YOUR STORY, YOUR STYLE</span><h2>Bring home a little <em>heritage.</em></h2></div><a href="#collections" className="button button-light">Explore collections <ArrowRight size={17}/></a><div className="closing-pattern">✳ ✳ ✳ ✳ ✳</div></section>
    </main>

    <footer className="footer"><div className="footer-main"><BrandMark/><p>Handloom home furnishings with colour, craft and character.</p><div className="footer-links"><a href="#collections">Collections</a><a href="#story">Our story</a><a href="#visit">Contact</a></div><a className="footer-social" href={waLink('Hello Jawad Handlooms!')} target="_blank" rel="noreferrer"><MessageCircle size={17}/> WhatsApp</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Jawad Handlooms. All rights reserved.</span><span>Made with care in Bengaluru, India <span className="india-heart">♥</span></span></div></footer>

    <a className="floating-whatsapp" href={waLink('Hello Jawad Handlooms! I would like to enquire about your collection.')} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={24}/><span>Chat with us</span></a>
    {toast && <div className="toast"><Check size={16}/>{toast}</div>}
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="product-modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Close"><X/></button><img src={selected.image} alt={selected.name}/><div className="modal-content"><span className="product-category">{selected.category}</span><h2>{selected.name}</h2><p>{selected.description}</p><div className="modal-availability"><Sparkles size={15}/> Ask us about colours, sizes & availability</div><p className="modal-note">Please confirm current price, colours and availability with our team.</p><button className="button button-dark" onClick={() => enquire(selected)}>Enquire on WhatsApp <ArrowUpRight size={17}/></button></div></div></div>}
  </div>
}
