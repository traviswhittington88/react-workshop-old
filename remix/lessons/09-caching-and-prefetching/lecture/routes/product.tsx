import { json, defer } from '@remix-run/node'
import { sleep } from '~/utils/helpers'
import { Await, useLoaderData } from '@remix-run/react'
import { Suspense } from 'react'

const getAuth = () => Promise.resolve({ user: {} })
const getProduct = () => Promise.resolve({ name: 'iPhone' })
const getProductComments = () => Promise.resolve(['Good Phone']).then(sleep(3000))

export const loader = async () => {
  const [user, product] = await Promise.all([getAuth(), getProduct()])
  const commentsPromise = getProductComments()

  return defer({ user, product, commentsPromise })
}

export default function ProductProfile() {
  const { user, product, commentsPromise } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1>{product.name}</h1>
      <Suspense>
        <Await resolve={commentsPromise}>
          {(comments) => {
            return <div>Comments: {comments[0]}</div>
          }}
        </Await>
      </Suspense>
    </div>
  )
}
