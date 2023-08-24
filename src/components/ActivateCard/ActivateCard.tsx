import { cardsUrl, fetcher } from '@/pages'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

async function activateCardFetcher(url: string, { arg }: { arg: { cardId: number } }) {
  return fetch(url + '/' + arg.cardId, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  }).then((res) => res.json())
}

const activateCardUrl = '/api/card/activate/'


export default function ActivateCard({ companyId }: { companyId: number }) {
  const { data: cardsResponse, error, isLoading, mutate: mutateCard } = useSWR(cardsUrl, fetcher)
  const { data, trigger: activateCard } = useSWRMutation(activateCardUrl, activateCardFetcher)
  const card = cardsResponse && cardsResponse.cards.length > 0 ? cardsResponse.cards[0] as Card : undefined
  const onClickActivate = async () => {
    if (!card) return
    await activateCard({cardId: card.id})
    await mutateCard()
  }  

  return (
    <>
    {card && (
      <div className="card bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <p>Card Status</p>
          <p>{card.status}</p>
          {!(card.status === 'active') && 
            <>
              <h2 className="card-title">Activate card</h2>
              <button onClick={onClickActivate} className="btn btn-primary">Activate</button>
            </>
          }
          {data && (<><div>{data.result}</div></>)}
        </div>
      </div>
        )}
    </>
  )
}
