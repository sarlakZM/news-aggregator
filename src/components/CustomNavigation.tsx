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
    let currentNavigation: any = {};
    if(!isHead){
      currentNavigation = createNavigationItem({totalItems: items.length, item: head, isHead: true});
      currentNavigation.children = items.map( (item: string) => createNavigationItem({head: head, item: item, isHead: false, handleClick}));
      currentNavigation.action = <Chip label={items.length} color="primary" size="small" />

    }else{
      const existringValuesSet = new Set();
      currentNavigation =  { ...isHead }
      currentNavigation.children.forEach((item:any) => existringValuesSet.add(item.title));
      const uniqueNewValues = items.filter( (item:string) => !existringValuesSet.has(item));
      currentNavigation.children = [ ...currentNavigation.children, ...uniqueNewValues.map( (item: string) => createNavigationItem({head: head, item: item, isHead: false, handleClick}))]
      currentNavigation.action = <Chip label={items.length} color="primary" size="small" />
    }



  return [currentNavigation] as Navigation
}

  const createNavigationItem = ({ totalItems, head, item , isHead, handleClick}: any) =>{
      const navigationItem: any = {
                      segment: `${item.toLowerCase().split(' ').join('')}`,
                      title: `${item}`,
                      icon: <FiberNewIcon />,
                      kind: 'page',
                    }
        isHead ? ( 
          navigationItem.children ??= []
        ) :
        (
          navigationItem.action ??= <IconButton
                aria-label={item}
                color="primary"
                onClick={() => handleClick(head, item)}
              >
                <InfoIcon />
            </IconButton>
    )
    return navigationItem as Navigation;
  }



export default CustomNavigation;
