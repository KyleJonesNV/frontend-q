import AccountDetails from '@/components/AccountDetails/AccountDetails'
import ActivateCard from '@/components/ActivateCard/ActivateCard'
import Company from '@/components/Company/Company'
import Contact from '@/components/Contact/Contact'
import Invoices from '@/components/Invoices/Invoices'
import Navbar from '@/components/Navbar/Navbar'
import Transactions from '@/components/Transactions/Transactions'
import { useCallback } from 'react'
import useSWR from 'swr'

export const fetcher = (url: string) => fetch(url).then((res) => res.json())
const companyId = 4
export const companyUrl = `/api/company`
const accountsUrl = `/api/account/company/${companyId}`
const transactionsUrl = `/api/transaction/company/${companyId}`
export const cardsUrl = `/api/card/company/${companyId}`

export default function Home() {
  const { data: accountsData, error: accountsError, isLoading: accountsIsLoading, mutate: mutateAccount } = useSWR(accountsUrl, fetcher)
  const { data: transationsData, error: transationsError, isLoading: transationsIsLoading, mutate: mutateTransations } = useSWR(transactionsUrl, fetcher)

  const OnPayMutation = useCallback(async () => {
    await mutateAccount()
    await mutateTransations()
  }, [mutateAccount, mutateTransations])

  const { accounts } = accountsData ?? {}

  if (accountsError) return <div>{`Failed to load :${accountsError}`}</div>
  if (transationsError) return <div>{`Failed to load :${transationsError}`}</div>
  if (accountsIsLoading || transationsIsLoading) return <div>Loading...</div>

  return (
    <main>
      <Navbar />
      <div className="flex min-h-screen flex-col p-12">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <Company companyId={companyId} />
            <Invoices companyId={companyId} onPayMutation={OnPayMutation}/>
          </div>
          <div className="flex flex-col gap-4">
            <AccountDetails accounts={accounts} />
            <Transactions companyId={companyId}/>
            <ActivateCard companyId={companyId}/>
            <Contact />
          </div>
        </div>        

      </div>
    </main>
  )
}
