import { type Navigation } from '@toolpad/core/AppProvider'
import CustomNavigation from './CustomNavigation'

const PersonalizedFeedsNavigation = ({
  mainNavigation,
  sources,
  categories,
  authors,
  handleClick,
}: {
  mainNavigation: Navigation
  sources?: Array<string>
  categories?: Array<string>
  authors?: Array<string>
  handleClick: any
}) => {
  const allNavigation: Record<string, Navigation> = {
    sources: [],
    categories: [],
    authors: [],
  }
  sources &&
    sources.length > 0 &&
    (
      allNavigation['sources'] = CustomNavigation({
      mainNavigation: mainNavigation,
      items: sources,
      head: 'Sources',
      handleClick,
    }))
  categories &&
    categories.length > 0 &&
    (allNavigation['categories'] = CustomNavigation({
      mainNavigation: mainNavigation,
      items: categories,
      head: 'Categories',
      handleClick,
    }))
  authors &&
    authors.length > 0 &&
    (allNavigation['authors'] = CustomNavigation({
      mainNavigation: mainNavigation,
      items: authors,
      head: 'Authors',
      handleClick,
    }))

  return allNavigation
}

export default PersonalizedFeedsNavigation
