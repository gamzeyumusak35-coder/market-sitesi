import Link from 'next/link'

async function getUrunler() {
  const res = await fetch('http://localhost:3000/api/urunler', {
    cache: 'no-store'
  })
  return res.json()
}

export default async function AnaSayfa() {
  const urunler = await getUrunler()

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Üst Bar */}
      <header className="bg-green-600 text-white p-4 shadow">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">🛒 Marketim</h1>
          <Link href="/sepet" className="bg-white text-green-600 px-4 py-2 rounded font-semibold">
            Sepet
          </Link>
        </div>
      </header>

      {/* Ürün Listesi */}
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Tüm Ürünler</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {urunler.map((urun: any) => (
            <div key={urun.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
              <div className="bg-gray-100 rounded-lg h-40 flex items-center justify-center mb-3">
                <span className="text-5xl">🛍️</span>
              </div>
              <span className="text-xs text-green-600 font-medium mb-1">
                {urun.kategoriler?.ad}
              </span>
              <h3 className="font-semibold text-gray-800">{urun.ad}</h3>
              <p className="text-sm text-gray-500 mt-1">{urun.aciklama}</p>
              <div className="mt-auto pt-3 flex justify-between items-center">
                <span className="font-bold text-green-600">{urun.fiyat} ₺</span>
                <button className="bg-green-600 text-white text-sm px-3 py-1 rounded hover:bg-green-700">
                  Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}