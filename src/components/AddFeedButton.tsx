import AddTaskIcon from '@mui/icons-material/AddTask'
import CustomPopover from './CustomPopover'
import PreferredFields from './preferredFields'

const AddFeedButton = () => {
  return (
    <CustomPopover buttonProps={{ title: 'New Feed', icon: <AddTaskIcon /> }}>
      <PreferredFields />
    </CustomPopover>
  )
}

export default AddFeedButton
