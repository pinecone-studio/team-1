import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import PdfPrinter from 'pdfmake';

// Сангийн тохиргоо (Хэрэв font байхгүй бол default font ашиглах байдлаар)
const fonts = {
  Roboto: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
  },
};

export async function POST(req: Request) {
  try {
    const { text, type } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Extract name and role from: "${text}". Return ONLY valid JSON format like {"name": "User Name", "role": "Job Title"}. Do not add any markdown formatting.`;
    const result = await model.generateContent(prompt);

    // Markdown-ыг цэвэрлэх
    const rawText = result.response
      .text()
      .replace(/```json|```/g, '')
      .trim();
    const data = JSON.parse(rawText);

    const printer = new PdfPrinter(fonts);
    const docDefinition: any = {
      content: [
        {
          text:
            type === 'shine_ajiltan'
              ? 'ХӨДӨЛМӨРИЙН ГЭРЭЭ'
              : 'АЖЛААС ЧӨЛӨӨЛӨХ ӨРГӨДӨЛ',
          style: 'header',
        },
        { text: `\n\nАжилтны нэр: ${data.name}`, fontSize: 12 },
        { text: `Албан тушаал: ${data.role}`, fontSize: 12 },
        { text: '\n\n\nГарын үсэг: ____________________', alignment: 'right' },
      ],
      styles: { header: { fontSize: 18, bold: true, alignment: 'center' } },
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks: Buffer[] = [];

    const pdfBuffer = await new Promise<Buffer>((resolve) => {
      pdfDoc.on('data', (chunk: Buffer<ArrayBufferLike>) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.end();
    });

    return NextResponse.json({
      success: true,
      pdfBase64: pdfBuffer.toString('base64'),
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'PDF үүсгэхэд алдаа гарлаа' },
      { status: 500 },
    );
  }
}
