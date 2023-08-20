import AccountDetails from '@/components/AccountDetails/AccountDetails'
import ActivateCard from '@/components/ActivateCard/ActivateCard'
import Contact from '@/components/Contact/Contact'
import Invoices from '@/components/Invoices/Invoices'
import Navbar from '@/components/Navbar/Navbar'
import Transations from '@/components/Transactions/Transactions'
import Image from 'next/image'
import { useCallback } from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const companyId = 4
const url = `/api/invoice/company/${companyId}`
const accountsUrl = `/api/account/company/${companyId}`
const transactionsUrl = `/api/transaction/company/${companyId}`


export default function Home() {
  const { data, error, isLoading } = useSWR(url, fetcher)

  const { data: accountsData, error: accountsError, isLoading: accountsIsLoading, mutate: mutateAccount } = useSWR(accountsUrl, fetcher)
  const { data: transationsData, error: transationsError, isLoading: transationsIsLoading, mutate: mutateTransations } = useSWR(transactionsUrl, fetcher)


  const OnPayMutation = useCallback(async () => {
    await mutateAccount()
    await mutateTransations()
  }, [mutateAccount, mutateTransations])

  const { accounts } = accountsData ?? {}

  if (error) return <div>{`Failed to load :${error}`}</div>
  if (accountsError) return <div>{`Failed to load :${accountsError}`}</div>
  if (transationsError) return <div>{`Failed to load :${transationsError}`}</div>
  if (isLoading || isLoading || transationsIsLoading) return <div>Loading...</div>

  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen flex-col p-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <div className="card bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title">Company AB</h2>
              </div>
            </div>
            <Invoices companyId={companyId} onPayMutation={OnPayMutation}/>
          </div>
          <div className="flex flex-col gap-4">
            <AccountDetails accounts={accounts} />
            <Transations companyId={companyId}/>
            <ActivateCard companyId={companyId}/>
            <Contact />
          </div>
        </div>
        {/* <Company /> */}

      </div>
    </main>
  )
}
