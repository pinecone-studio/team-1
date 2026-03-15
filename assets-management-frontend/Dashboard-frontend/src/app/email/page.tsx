"use client";

import { useQuery } from "@tanstack/react-query";

// Backend-ээс ирэх мэдээллийн бүтэц
interface GmailMessage {
  id: string;
  snippet: string;
  subject: string;
  from: string;
}

interface EmailResponse {
  messages: GmailMessage[];
}

export default function EmailList() {
  const { data, isLoading, error } = useQuery<EmailResponse, Error>({
    queryKey: ["emails"],
    queryFn: async () => {
      const res = await fetch("/api/emails");
      if (!res.ok) throw new Error("Мэйл татахад алдаа гарлаа");
      return res.json();
    },
  });

  if (isLoading) return <div className="p-4">Уншиж байна...</div>;

  if (error)
    return <div className="p-4 text-red-500">Алдаа: {error.message}</div>;

  const messages = data?.messages ?? [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Миний мэйлүүд</h2>
      {messages.length > 0 ? (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg.id} className="p-4 border rounded shadow-sm">
              <div className="font-semibold text-lg">{msg.subject}</div>
              <div className="text-sm text-gray-600">Хэнээс: {msg.from}</div>
              <p className="text-sm mt-2 text-gray-800 italic">
                "{msg.snippet}"
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Мэйл олдсонгүй.</p>
      )}
    </div>
  );
}
