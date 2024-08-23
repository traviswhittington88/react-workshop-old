import { useState, createContext, use, useMemo, memo, useContext } from 'react'
import { Icon } from '~/Icon'
import { LessonBody, LessonCard } from '~/Lesson'
import classnames from 'classnames'

/****************************************
  FavContext.tsx
*****************************************/

const FavContext = createContext()

export function FavProvider({ children }) {
  const [favorites, setFavorites] = useState([])

  const context = useMemo(() => {
    function updateFavorite(id) {
      if (isFavorite(id)) {
        setFavorites(favorites.filter((favId) => favId !== id))
      } else {
        setFavorites(favorites.concat(id))
      }
    }

    function isFavorite(id) {
      return favorites.includes(id)
    }
    return {
      favorites,
      updateFavorite,
      isFavorite,
    }
  }, [favorites])

  return <FavContext value={context} children={children} />
}

export function useFavContext() {
  const context = use(FavContext)
  if (!context) {
    // throw
  }
  return context || {}
}

/****************************************
  App.js
*****************************************/

export function App() {
  return (
    <LessonBody>
      <LessonCard>
        <FavProvider>
          <MainLayout />
        </FavProvider>
      </LessonCard>
    </LessonBody>
  )
}

/****************************************
  MainLayout.js
*****************************************/

const MainLayout = memo(() => {
  console.log('rerender main layout')
  return <BrowseVacationsPage />
})

/****************************************
 BrowseVacationsPage.js
 *****************************************/

function BrowseVacationsPage() {
  const { favorites } = use(FavContext)
  return (
    <div className="flex justify-between">
      <div>Favorites: {JSON.stringify(favorites)}</div>
      <div>
        <div className="flex flex-col gap-2">
          <FavoriteVacationButton id={1} />
          <FavoriteVacationButton id={2} />
          <FavoriteVacationButton id={3} />
        </div>
      </div>
    </div>
  )
}

/****************************************
  FavoriteVacationButton.js
*****************************************/

function FavoriteVacationButton({ id }) {
  const { isFavorite, updateFavorite } = useFavContext()
  const vacationIsFavorite = isFavorite(id)

  return (
    <button
      className={classnames(`button button-outline`, {
        '!text-yellow-500': vacationIsFavorite,
      })}
      onClick={() => updateFavorite(id)}
    >
      {vacationIsFavorite ? <Icon name="star" /> : <Icon name="starOutline" />}
      <span>Favorite</span>
    </button>
  )
}
