import * as React from 'react'
import Popover from '@mui/material/Popover'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'

const CustomPopover = ({ buttonProps: { title, icon }, children }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <>
      <Tooltip title={title} arrow>
        <Button
          color="primary"
          aria-label={icon}
          aria-describedby={id}
          variant="outlined"
          onClick={handleClick}
        >
          {icon}
        </Button>
      </Tooltip>
      <Popover
        disableScrollLock={false}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {children}
      </Popover>
    </>
  )
}

export default CustomPopover
