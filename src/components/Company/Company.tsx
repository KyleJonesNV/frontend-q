import { fetcher, companyUrl } from '@/pages'
import useSWR from 'swr'

export default function Company({ companyId }: { companyId: number }) {
  const { data, error, isLoading } = useSWR(companyUrl + '/' + companyId, fetcher)

  return (
    <>
      {data && (
        <div className="card bg-primary text-primary-content">
          <div className="card-body">
            <h2 className="card-title">{data.company.name}</h2>
          </div>
        </div>
      )}
    </>
  )
}
