type Company = {
  id: number
  name: string
}

type Invoice = {
  id: number
  title: string
  description: string
  dueDate: string
  status: string
  amount: number
  vendorId: number
  vendorName: string
  vendorImage: string
}

type NewInvoice = {
  companyId: number
  title: string
  description: string
  dueDate: string
  amount: number
  vendorId: number
}

type Account = {
  id: number
  spendingLimit: number
  currentSpending: number
}

type Transaction = {
  id: number
  accountId: number
  invoiceId: number
  amount: number
  vendorName: string
}

type NewTransation = {
  accountId: number
  vendorId: number
  invoiceId: number
  amount: number
}

type Card = {
  id: number
  status: string
  companyId: number,
}

type CardActivationResult = {
  result: string
}
