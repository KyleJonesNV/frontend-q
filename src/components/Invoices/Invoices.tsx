import { useCallback } from 'react'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const getInvoicesUrl = '/api/invoice/company/'
const payInvoiceUrl = '/api/invoice/pay/'
const accountId = 4

async function payInvoice(url: string, { arg }: { arg: { accountId: number; invoiceId: number } }) {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({ accountId: arg.accountId, invoiceId: arg.invoiceId }),
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json())
}

export function PayInvoice({ invoiceId, onPayMutation }: { invoiceId: number; onPayMutation: () => void }) {
  const { data, trigger: payMutate } = useSWRMutation(payInvoiceUrl, payInvoice)
  const onClickPay = async () => {
    await payMutate({ accountId, invoiceId })
    await onPayMutation()
  }

  return (
    <div className="flex flex-row align-middle gap-5">
      {data && (
        <div>
          <div className="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{data.message ?? data.result}</span>
          </div>
        </div>
      )}
      <button onClick={onClickPay} className="btn btn-primary self-center">
        Pay
      </button>
    </div>
  )
}

export default function Invoices({ companyId, onPayMutation }: { companyId: number; onPayMutation: () => void }) {
  const { data, error, isLoading } = useSWR(getInvoicesUrl + companyId, fetcher)
  const { invoices } = data ?? {}

  if (error) return <div>{`Failed to load :${error}`}</div>
  if (isLoading) return <div>Loading...</div>

  return (
    <>
      {invoices &&
        invoices.map((invoice: Invoice, index: number) => (
          <div key={index} className="card bg-neutral text-neutral-content">
            <div className="flex flex-row gap-4">
              <div>
                <figure className="rounded-lg h-60 w-60">
                  <img src={invoice.vendorImage} alt="vendorImage" />
                </figure>
              </div>
              <div className="card-body flex flex-col justify-between">
                <div className="flex justify-between">
                  <h2 className="card-title">{invoice.title}</h2>
                  <div className="badge badge-warning gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    new invoice
                  </div>
                </div>
                <div>
                  <p>{invoice.description}</p>
                  <p>{invoice.vendorName}</p>
                </div>
                <div className="card-actions justify-end">
                  <PayInvoice invoiceId={invoice.id} onPayMutation={onPayMutation} />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  )
}
