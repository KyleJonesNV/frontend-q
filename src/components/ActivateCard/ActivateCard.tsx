import useSWR from 'swr'
const fetcher = (url: string) => fetch(url).then((res) => res.json())
const url = '/api/account/company/'

export default function ActivateCard({companyId}: {companyId: Number}) {
  const { data, error, isLoading } = useSWR(url + companyId, fetcher)

  if (error) return <div>{`Failed to load :${error}`}</div>
  if (isLoading) return <div>Loading...</div>

  const { accounts } = data ?? {}

  return (
    <>
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">Activate Card</h2>
          <p>Card Status</p>
          <p>Inavtive</p>
          <button className="btn btn-primary">Activate</button>
        </div>
      </div>
    </>
  )
}
