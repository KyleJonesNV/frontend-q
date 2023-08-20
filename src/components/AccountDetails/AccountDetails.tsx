import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Invoices({accounts}: {accounts: Account[]}) {
  return (
    <>
      {accounts &&
        accounts.map((account: Account, index: number) => (
          <div key={index} className="card bg-neutral text-neutral-content">
            <div className="card-body flex flex-col justify-between">
              <div className="flex justify-start">
                <h2 className="text-lg">Remaining spend</h2>
              </div>
              <div className="flex justify-center">
                <h2 className="text-lg">{`${account.currentSpending} / ${account.spendingLimit}`}</h2>
              </div>
              <div className="flex justify-end">Based on your set limit</div>
            </div>
          </div>
        ))}
    </>
  )
}
