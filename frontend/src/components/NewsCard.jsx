import { Card, CardContent, CardMedia, Typography } from "@mui/material";

function NewsCard({ titulo, descricao, imagem, link, data }) {
  return (
      <Card 
        component="a"
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          height: "100%",
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
          image={imagem}
          alt={titulo}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data}
          </Typography>
          <Typography>
            {descricao}
          </Typography>
        </CardContent>
      </Card>
  );
}

export default NewsCard; 