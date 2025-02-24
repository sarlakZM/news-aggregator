import { Navigation } from '@toolpad/core/AppProvider'
import InfoIcon from '@mui/icons-material/Info'
import FiberNewIcon from '@mui/icons-material/FiberNew'
import IconButton from '@mui/material/IconButton'
import Chip from '@mui/material/Chip'

const CustomNavigation = ({
  mainNavigation,
  items,
  head,
  handleClick,
}: {
  [key: string]: any
}) => {
  const isHead = mainNavigation.find((item: any) => item.title === head)

  let currentNavigation: Navigation = isHead // Update the number of items if the head existed
    ? [
        {
          ...isHead,
          kind: 'page',
          action: <Chip label={items.length} color="primary" size="small" />,
        },
      ]
    : //Add the head to navigation
      [
        {
          segment: `${head.toLowerCase().split(' ').join('')}`,
          title: `${head}`,
          icon: <FiberNewIcon />,
          action: <Chip label={items.length} color="primary" size="small" />,
          children: [],
          kind: 'page',
        },
      ]

  const children: any =
    currentNavigation[0].kind == 'page' && currentNavigation[0].children
  let childrenTitles: Array<string> = []
  let notNavigatedItem = []
  if (children && children.length > 0) {
    childrenTitles =
      children &&
      (children as Navigation).reduce((arr: Array<string>, cur) => {
        cur.kind === 'page' && (arr = [...arr, cur.title as string])
        return arr
      }, [])

    notNavigatedItem = items.filter(
      (item: string) => !childrenTitles.includes(item)
    )
  } else notNavigatedItem = [...items]

  if (notNavigatedItem.length > 0) {
    const newItemNavigation: Navigation = notNavigatedItem.map(
      (item: string) => ({
        segment: `${item.toLowerCase().split(' ').join('')}`,
        title: `${item}`,
        icon: <FiberNewIcon />,
        kind: 'page',
        action: (
          <IconButton
            aria-label={item}
            color="primary"
            onClick={() => handleClick(head, item)}
          >
            <InfoIcon />
          </IconButton>
        ),
      })
    )

    currentNavigation[0].kind == 'page' &&
      currentNavigation[0].children &&
      (currentNavigation[0].children = [
        ...currentNavigation[0].children,
        ...newItemNavigation,
      ])
  }

  return currentNavigation
}

export default CustomNavigation
