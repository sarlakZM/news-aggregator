import { Navigation } from '@toolpad/core/AppProvider'
import PersonIcon from '@mui/icons-material/Person'
import IconButton from '@mui/material/IconButton'
import ArticleIcon from '@mui/icons-material/Article'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import PersonSearchIcon from '@mui/icons-material/PersonSearch'
import SourceIcon from '@mui/icons-material/Source'
import CategoryIcon from '@mui/icons-material/Category'
import Chip from '@mui/material/Chip'

const navigationIcon: any = {
  head: {
    Authors: <PersonIcon />,
    Sources: <SourceIcon />,
    Categories: <CategoryIcon />,
  },
  search: {
    Authors: <PersonSearchIcon />,
    Sources: <ContentPasteSearchIcon />,
    Categories: <ContentPasteSearchIcon />,
  },
}

const CustomNavigation = ({
  mainNavigation,
  items,
  head,
  handleClick,
}: {
  [key: string]: any
}) => {
  const isHead = mainNavigation.find((item: any) => item.title === head)
  let currentNavigation: any = {}
  if (!isHead) {
    currentNavigation = createNavigationItem({
      head: head,
      item: head,
      isHead: true,
    })
    currentNavigation.children = items.map((item: string) =>
      createNavigationItem({
        head: head,
        item: item,
        isHead: false,
        handleClick,
      })
    )
    currentNavigation.action = (
      <Chip label={items.length} color="primary" size="small" />
    )
  } else {
    const existringValuesSet = new Set()
    currentNavigation = { ...isHead }
    currentNavigation.children.forEach((item: any) =>
      existringValuesSet.add(item.title)
    )
    const uniqueNewValues = items.filter(
      (item: string) => !existringValuesSet.has(item)
    )
    currentNavigation.children = [
      ...currentNavigation.children,
      ...uniqueNewValues.map((item: string) =>
        createNavigationItem({
          head: head,
          item: item,
          isHead: false,
          handleClick,
        })
      ),
    ]
    currentNavigation.action = (
      <Chip label={items.length} color="primary" size="small" />
    )
  }

  return [currentNavigation] as Navigation
}

const createNavigationItem = ({ head, item, isHead, handleClick }: any) => {
  const navigationItem: any = {
    segment: `${item.toLowerCase().split(' ').join('')}`,
    title: `${item}`,
    icon: isHead ? navigationIcon['head'][head as string] : <ArticleIcon />,
    kind: 'page',
  }
  isHead
    ? (navigationItem.children ??= [])
    : (navigationItem.action ??= (
        <>
          <IconButton
            aria-label={item}
            color="primary"
            onClick={() => handleClick(head, item)}
          >
            {navigationIcon['search'][head as string]}
          </IconButton>
        </>
      ))
  return navigationItem as Navigation
}

export default CustomNavigation
