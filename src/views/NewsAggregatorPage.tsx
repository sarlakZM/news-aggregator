import { Suspense, lazy } from 'react'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FeedIcon from '@mui/icons-material/Feed'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import { AppProvider, type Navigation } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { useDemoRouter } from '@toolpad/core/internal'

import ToolbarActions from '../components/ToolbarActions'
import { appTheme } from '../styles/appTheme'
import AddFeedButton from '../components/AddFeedButton'
import PersonalizedFeeds from '../components/PersonalizedFeedsNavigation'
import { useDispatch, useSelector } from 'react-redux'
import { memoizedSelectPreferred } from '../store/newsSelects'
import { filterArticlesByPreferredFeed } from '../store/newsSlice'
import { AppDispatch } from '../store/store'
import { appBranding } from '../utils/app.config'

const PageContentLazy = lazy(() => import('../components/PageContent'))

const NAVIGATION: Navigation = [
  {
    kind: 'header',
    title: 'Home',
  },
  {
    segment: 'all',
    title: 'All News',
    icon: <DashboardIcon />,
  },
  { kind: 'divider' },
  {
    segment: 'createnewfeed',
    title: 'Create New Feed',
    icon: <FeedIcon />,
    action: <AddFeedButton />,
  },
]

export default function AppProviderLayout() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useDemoRouter('/dashboard')
  const { sources, categories, authors } = useSelector(memoizedSelectPreferred)
  const mainNavigation = [...NAVIGATION]
  const handleClick = (head: string, value: string) => {
    dispatch(
      filterArticlesByPreferredFeed({ typeFiterPreferred: head, value: value })
    )
  }
  let navigation = PersonalizedFeeds({
    mainNavigation,
    sources,
    categories,
    authors,
    handleClick,
  })
  const memoizedNavigation = [
    ...NAVIGATION,
    ...navigation.sources,
    ...navigation.categories,
    ...navigation.authors,
  ]

  return (
    // preview-start
    <AppProvider
      navigation={memoizedNavigation}
      branding={{
        logo: <NewspaperIcon fontSize="large" color="primary" />,
        title: appBranding.title,
        homeUrl: '/',
      }}
      router={router}
      theme={appTheme}
    >
      <DashboardLayout
        slots={{
          toolbarActions: ToolbarActions,
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <PageContentLazy />
        </Suspense>
      </DashboardLayout>
    </AppProvider>
    // preview-end
  )
}
