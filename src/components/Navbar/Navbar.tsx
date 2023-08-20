import Link from 'next/link'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())
const companyId = 1
const url = `/api/company/${companyId}`

function NavDropDown({ user }: { user: any }) {
  return (
    <>
      <h1>{user.name}</h1>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={user.avatar ?? '/sparkle.svg'} alt="avatar" className="dark:invert" />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export default function Navbar() {
  const { data, error, isLoading } = useSWR<any>(url, fetcher)
  const user = data?.user

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Qred</a>
      </div>
      <div className="flex-none gap-2">
        {user ? (
          <NavDropDown user={user} />
        ) : (
          <>
            <Link href={'/login/'}>
              <button className="btn btn-outline">Login</button>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
