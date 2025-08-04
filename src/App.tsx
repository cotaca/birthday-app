import './App.css';
import { useQuery } from '@apollo/client';
import { GET_BIRTHDAY_CHARACTERS } from './graphql/operations/GetBirthdayCharacters.ts';
import type { GetBirthdayCharactersQuery } from './graphql/__generated__/graphql.ts';
import {
  type CharacterFromQuery,
  isValid,
} from './graphql/helpers/birthdayCharacters.ts';
import { Box, Typography, Link } from '@mui/material';
import Portrait from './components/Portrait/Portrait.tsx';

function App() {
  const { loading, error, data } = useQuery<GetBirthdayCharactersQuery>(
    GET_BIRTHDAY_CHARACTERS
  );

  if (loading) return <p>Lade Daten...</p>;
  if (error) return <p>Fehler: {error.message}</p>;
  if (!data?.Page?.characters) return <p>Keine Charaktere gefunden.</p>;

  const characters: NonNullable<CharacterFromQuery>[] =
    data.Page.characters.filter(isValid);
  const currentDate = new Date();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant={'h6'}>Heute ist der</Typography>
      <Typography variant={'h2'} sx={{ fontWeight: 'bold' }}>
        {currentDate.toLocaleDateString()}
      </Typography>
      <Typography variant={'h6'}>
        Herzlichen Glückwunsch an {characters.length} Charaktere!
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          pt: 2,
          gap: 2,
        }}
      >
        {characters
          .filter(
            (
              character
            ): character is typeof character & { image: { large: string } } =>
              !!character.image?.large
          )
          .map((character) => (
            <Link
              key={character.id}
              target={'_blank'}
              href={`https://anilist.co/character/${String(character.id)}/${character.name?.full?.replaceAll(' ', '-') ?? ''}`}
              underline={'none'}
            >
              <Portrait
                src={character.image.large}
                alt={'Character Portrait'}
                label={character.name?.full ?? 'Unbekannt'}
              />
            </Link>
          ))}
      </Box>
    </Box>
  );
}

export default App;
