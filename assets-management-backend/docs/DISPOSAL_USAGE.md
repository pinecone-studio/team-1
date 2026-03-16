# Disposal (Устгах / Эвдрэлтэй хөрөнгийн устгал) — хэрхэн ашиглах

Эвдрэлтэй эсвэл ашиглахаа больсон хөрөнгийг устгах хүсэлт илгээж, IT → Санхүү баталгаажуулсны дараа устгал гүйцэтгэдэг workflow.

---

## 1. Төлөвүүд (Status)

| Төлөв | Тайлбар |
|-------|--------|
| `PENDING` | Шинэ хүсэлт, IT баталгаажуулахаас өмнө |
| `IT_APPROVED` | IT баталгаажуулсан, Санхүүгийн шийдвэр хүлээгдэж буй |
| `FINANCE_APPROVED` | Санхүү баталгаажуулсан, бодит устгал хийхэд бэлэн |
| `REJECTED` | Татгалзсан |
| `COMPLETED` | Устгал дууссан, хөрөнгө DISPOSED болсон |

Хөрөнгийн төлөв: `DISPOSAL_REQUESTED` (хүсэлт орсон), дараа нь `DISPOSED` (устгагдсан).

---

## 2. GraphQL API

### Query

```graphql
# Нэг хүсэлт
query GetDisposalRequest($id: ID!) {
  disposalRequest(id: $id) {
    id
    assetId
    method
    reason
    status
    requestedBy { id firstName lastName email }
    itApprovedBy { id firstName lastName }
    financeApprovedBy { id firstName lastName }
    rejectedBy { id firstName lastName }
    rejectionReason
    createdAt
    updatedAt
  }
}

# Төлөвөөр шүүх
query GetDisposalRequests($status: String) {
  disposalRequests(status: $status) {
    id
    assetId
    method
    reason
    status
    createdAt
  }
}
```

Жишээ: `disposalRequests(status: "PENDING")` — хүлээгдэж буй хүсэлтүүд.

### Mutations

**1. Устгах хүсэлт үүсгэх** (жишээ нь эвдрэлтэй хөрөнгийн хувьд)

```graphql
mutation RequestDisposal(
  $assetId: ID!
  $requestedBy: ID!
  $method: String!
  $reason: String
) {
  requestDisposal(
    assetId: $assetId
    requestedBy: $requestedBy
    method: $method
    reason: $reason
  ) {
    id
    status
    assetId
  }
}
```

- `assetId` — устгах хөрөнгийн ID  
- `requestedBy` — хүсэлт илгээсэн ажилтны ID  
- `method` — устгах арга (жишээ: "RECYCLE", "DONATE", "DESTROY")  
- `reason` — шалтгаан (заавал биш)

**2. IT баталгаажуулах**

```graphql
mutation ApproveDisposal($id: ID!, $approvedBy: ID!, $stage: String!) {
  approveDisposal(id: $id, approvedBy: $approvedBy, stage: $stage) {
    id
    status
  }
}
```

- `stage: "IT_APPROVED"` — IT баталгаажуулсан.

**3. Санхүү баталгаажуулах**

- Дахин `approveDisposal` дуудаж, `stage: "FINANCE_APPROVED"` өгнө.

**4. Татгалзах**

```graphql
mutation RejectDisposal($id: ID!, $rejectedBy: ID!, $reason: String) {
  rejectDisposal(id: $id, rejectedBy: $rejectedBy, reason: $reason) {
    id
    status
  }
}
```

**5. Устгал дуусгах** (данснаас хасах, бодит устгал хийгдсэн гэж тэмдэглэх)

```graphql
mutation CompleteDisposal(
  $id: ID!
  $certifiedBy: ID!
  $writeOffValue: Int
  $recipient: String
) {
  completeDisposal(
    id: $id
    certifiedBy: $certifiedBy
    writeOffValue: $writeOffValue
    recipient: $recipient
  ) {
    id
    status
  }
}
```

- Зөвхөн `FINANCE_APPROVED` төлөвтэй хүсэлт дээр ажиллана.  
- Үүний дараа хөрөнгийн төлөв `DISPOSED` болно.

**6. Super Admin — төлөв шууд өөрчлөх**

```graphql
mutation AdminOverrideDisposal($id: ID!, $status: String!) {
  adminOverrideDisposal(id: $id, status: $status) {
    id
    status
  }
}
```

---

## 3. Frontend-ээс ашиглах дараалал

1. **Эд хөрөнгө** жагсаалтаас эвдрэлтэй/устгах хөрөнгийг сонгоод **«Устгах хүсэлт илгээх»** товчоор `requestDisposal(assetId, requestedBy, method, reason)` дуудах.  
2. **Хүлээгдэж буй устгалын хүсэлт** — `disposalRequests(status: "PENDING")` татаж, IT хэрэглэгч **«Баталгаажуулах»** дарж `approveDisposal(..., stage: "IT_APPROVED")` дуудах.  
3. Санхүүгийн хэрэглэгч `approveDisposal(..., stage: "FINANCE_APPROVED")` дуудах.  
4. Бодит устгал хийгдсэн бол `completeDisposal` дуудаж хөрөнгийг DISPOSED болгох.  
5. Татгалзах бол `rejectDisposal` дуудах.

Frontend-д `GetActiveDisposalsDocument`, `RequestDisposalDocument`, `ApproveDisposalDocument`, `RejectDisposalDocument` аль хэдийн байгаа (assets.graphql / disposal-operations.graphql). `CompleteDisposal` болон `GetDisposalRequests` (status-аар шүүх) query/mutation-уудыг graphql файлд нэмж, кодогеноор ашиглаж болно.

---

## 4. Файлуудын байршил (backend)

- **Mutations:** `src/db/disposalRequests/mutations/`  
  - `requestDisposal.ts` — хүсэлт үүсгэх  
  - `approveDisposalRequest.ts` — IT / Finance баталгаажуулах  
  - `rejectDisposalRequest.ts` — татгалзах  
  - `completeDisposal.ts` — устгал дуусгах  
  - `uploadDataWipeCertificate.ts` — өгөгдөл цэвэрлэсэн гэрчилгээ  
- **Queries:** `src/db/disposalRequests/queries/`  
  - `getDisposalRequest.ts`, `getDisposalRequests.ts`, `getDisposalRequestsByAsset.ts`  
- **GraphQL:** `src/graphql-gql/resolvers/mutations/disposalMutations.ts`, `resolvers/queries/disposalQueries.ts`

---

## 5. Товч урсгал

```
[Хөрөнгө сонгох] → requestDisposal → PENDING
       ↓
[IT баталгаажуулах] → approveDisposal(stage: "IT_APPROVED") → IT_APPROVED
       ↓
[Санхүү баталгаажуулах] → approveDisposal(stage: "FINANCE_APPROVED") → FINANCE_APPROVED
       ↓
[Устгал гүйцэтгэх] → completeDisposal → COMPLETED, asset.status = DISPOSED
```

Татгалзах: аль ч алхамд `rejectDisposal` дуудаж REJECTED болгоно; хөрөнгө дахин AVAILABLE болно.
