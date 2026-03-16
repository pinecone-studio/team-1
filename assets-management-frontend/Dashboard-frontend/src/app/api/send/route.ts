import { NextResponse } from "next/server";
import docusign from "docusign-esign";
import { PDFDocument } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import fs from "fs";
import path from "path";

export async function POST() {
  try {
    // 1. PDF үүсгэх
    const pdfDoc = await PDFDocument.create();
    pdfDoc.registerFontkit(fontkit);

    // 2. Local font унших
    const fontPath = path.join(
      process.cwd(),
      "public/fonts/NotoSans-Regular.ttf",
    );

    const fontBytes = fs.readFileSync(fontPath);

    const customFont = await pdfDoc.embedFont(fontBytes);

    // 3. Page үүсгэх
    const page = pdfDoc.addPage([600, 400]);

    // 4. Text бичих
    page.drawText("Гэрээний баримт", {
      x: 100,
      y: 320,
      size: 20,
      font: customFont,
    });

    page.drawText("Та энэхүү гэрээг баталгаажуулж гарын үсэг зурна уу.", {
      x: 100,
      y: 280,
      size: 12,
      font: customFont,
    });

    page.drawText("SignHere", {
      x: 100,
      y: 220,
      size: 12,
      font: customFont,
    });

    // 5. PDF save
    const pdfBytes = await pdfDoc.save();
    const documentBase64 = Buffer.from(pdfBytes).toString("base64");

    // 6. DocuSign API client
    const dsApiClient = new docusign.ApiClient();

    dsApiClient.setBasePath(process.env.DOCUSIGN_BASE_PATH!);

    dsApiClient.addDefaultHeader(
      "Authorization",
      `Bearer ${process.env.DOCUSIGN_ACCESS_TOKEN}`,
    );

    const envelopesApi = new docusign.EnvelopesApi(dsApiClient);

    // 7. Envelope definition
    const envelopeDefinition = {
      emailSubject: "Гарын үсэг зурах баримт",
      documents: [
        {
          documentBase64: documentBase64,
          name: "Gernee.pdf",
          fileExtension: "pdf",
          documentId: "1",
        },
      ],
      recipients: {
        signers: [
          {
            email: "tsetsegulziiocherdene@gmail.com",
            name: "Ochko",
            recipientId: "1",
            tabs: {
              signHereTabs: [
                {
                  anchorString: "SignHere",
                  anchorUnits: "pixels",
                  anchorXOffset: "0",
                  anchorYOffset: "0",
                },
              ],
            },
          },
        ],
      },
      status: "sent",
    };

    // 8. Envelope илгээх
    const results = await envelopesApi.createEnvelope(
      process.env.DOCUSIGN_ACCOUNT_ID!,
      { envelopeDefinition },
    );

    return NextResponse.json({
      success: true,
      envelopeId: results.envelopeId,
    });
  } catch (error) {
    console.error("DocuSign/PDF алдаа:", error);

    return NextResponse.json(
      {
        error: "Баримт үүсгэхэд алдаа гарлаа: " + (error as Error).message,
      },
      { status: 500 },
    );
  }
}
