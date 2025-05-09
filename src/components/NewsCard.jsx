import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function NewsCard({ title, description, image_url: imageUrl, url, date }) {
  return (
    <Card 
      component="a"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        '&:hover': {
          boxShadow: 6
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {date}
        </Typography>
        <Typography>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NewsCard; 