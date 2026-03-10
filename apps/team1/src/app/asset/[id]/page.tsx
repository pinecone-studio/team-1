'use client';
import { useParams } from 'next/navigation';

// Mock мэдээллийн сан (Бодит төсөл дээр үүнийг D1 эсвэл API-аас татна)
const mockData = [
  { id: 'BUNDLE-100', name: 'Дэлгэц - 100', owner: 'Бат', status: 'Хэвийн' },
  { id: 'KABEL-100', name: 'HDMI Кабел', owner: 'Бат', status: 'Хэвийн' },
  { id: 'KEYB-100', name: 'Гар', owner: 'Бат', status: 'Хэвийн' },
];

export default function AssetPage() {
  const params = useParams();
  const id = params.id as string;

  // ID-аар өгөгдлийг хайх
  const asset = mockData.find((item) => item.id === id);

  if (!asset) {
    return (
      <div style={{ padding: '20px', color: 'red' }}>
        Хөрөнгө олдсонгүй! (ID: {id})
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Хөрөнгийн мэдээлэл</h1>
      <div style={styles.card}>
        <p>
          <strong>ID:</strong> {asset.id}
        </p>
        <p>
          <strong>Нэр:</strong> {asset.name}
        </p>
        <p>
          <strong>Эзэмшигч:</strong> {asset.owner}
        </p>
        <p>
          <strong>Төлөв:</strong> {asset.status}
        </p>
      </div>

      <button
        style={styles.button}
        onClick={() => alert('Цахим гарын үсэг зурах процесс эхэллээ!')}
      >
        Хүлээлгэн өгөх / Гарын үсэг зурах
      </button>
    </div>
  );
}

const styles = {
  container: { padding: '20px', fontFamily: 'sans-serif' },
  card: {
    border: '1px solid #ccc',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#2ecc71',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
