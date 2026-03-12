'use client';

import { useEffect, useState } from 'react';

interface Asset {
  id: string;
  assetTag: string;
  category: string;
  serialNumber: string;
  status: string;
  purchaseCost: number;
}

export default function AssetsPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAssets = async () => {
    const query = `query { assets { id assetTag category serialNumber status purchaseCost } }`;
    const res = await fetch(
      'https://my-next-app.tsetsegulziiocherdene.workers.dev/api/graphql',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      },
    );
    const result = await res.json();
    setAssets(result.data.assets);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  // 1. Архивлах (Mutation)
  // AssetsPage.tsx доторх handleArchive функц
  const handleArchive = async (assetId: string) => {
    if (!confirm('Энэ хөрөнгийг устгах уу?')) return;

    // Schema-д байгаа нэр нь "deleteAsset" тул פронтенд дээр ч мөн "deleteAsset" гэж дуудна
    const mutation = `
    mutation DeleteAsset($id: ID!) {
      deleteAsset(id: $id)
    }
  `;

    const res = await fetch(
      'https://my-next-app.tsetsegulziiocherdene.workers.dev/api/graphql',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: mutation,
          variables: { id: assetId },
        }),
      },
    );

    const result = await res.json();

    if (result.errors) {
      console.error('GraphQL алдаа:', result.errors);
      alert('Алдаа гарлаа: ' + result.errors[0].message);
    } else if (result.data.deleteAsset) {
      alert('Устгал амжилттай боллоо!');
      // Жагсаалтаа дахин татаж шинэчлэх
      fetchAssets();
    }
  };

  if (loading) return <p>Ачааллаж байна...</p>;

  return (
    <main style={{ padding: '40px' }}>
      <h1>Хөрөнгийн жагсаалт</h1>
      <table border={1} style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Tag</th>
            <th>Ангилал</th>
            <th>Статус</th>
            <th>Үйлдэл</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>{asset.assetTag}</td>
              <td>{asset.category}</td>
              <td>{asset.status}</td>
              <td>
                <button onClick={() => handleArchive(asset.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
