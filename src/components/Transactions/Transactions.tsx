import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const url = '/api/transaction/company/'
const latestLimit = 3

export default function Transations({ companyId }: { companyId: Number }) {
  const { data, error, isLoading } = useSWR(url + companyId, fetcher)

  if (error) return <div>{`Failed to load :${error}`}</div>
  if (isLoading) return <div>Loading...</div>

  const transations = data.transations as Transaction[]
  const latestTransation = transations.slice(0, latestLimit)

  return (
    <>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body">
          <h2 className="card-title">Latest transactions</h2>
          <div className="grid grid-cols-3 items-center text-center gap-2">
            <h2 className="bg-slate-700 text-gray-100">Amount</h2>
            <h2 className="bg-slate-700 text-gray-100">Account id</h2>
            <h2 className="bg-slate-700 text-gray-100">Vendor</h2>
            {latestTransation &&
              latestTransation.map((transation: Transaction, index: number) => (
                <>
                  <h2 className="bg-slate-500 text-gray-100">{transation.amount}</h2>
                  <h2 className="bg-slate-500 text-gray-100">{transation.accountId}</h2>
                  <h2 className="bg-slate-500 text-gray-100">{transation.vendorName}</h2>
                </>
              ))}
          </div>
          {transations.length > latestLimit && (
            <>
              <button className="btn">{`${transations.length - latestLimit} more items in transations view`}</button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
