import * as React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Skeleton from '@mui/material/Skeleton'
import { Article } from '../types/api.type'

export const Item: React.FC<any> = React.memo(({ item }: { item: Article }) => {
  const { title, author, description, image } = { ...item }
  return (
    <Card sx={{ maxWidth: 258, m: 4 }}>
      <CardHeader
        avatar={
          title ? (
            <Avatar alt={title.slice(5)} src={'./news.png'} />
          ) : (
            <Skeleton
              animation="wave"
              variant="circular"
              width={30}
              height={30}
            />
          )
        }
        title={
          title ? (
            title
          ) : (
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          )
        }
        subheader={
          author ? (
            author
          ) : (
            <Skeleton animation="wave" height={10} width="40%" />
          )
        }
      />
      {image ? (
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
          loading="lazy"
        />
      ) : (
        <Skeleton sx={{ height: 150 }} animation="wave" variant="rectangular" />
      )}
      <CardContent>
        {description ? (
          <Typography
            variant="body2"
            component="p"
            sx={{ color: 'text.secondary' }}
          >
            {description}
          </Typography>
        ) : (
          <React.Fragment>
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  )
})
