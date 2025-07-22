import './App.css';
import { useQuery } from '@apollo/client';
import { GET_BIRTHDAY_CHARACTERS } from './graphql/operations/GetBirthdayCharacters.ts';
import type { GetBirthdayCharactersQuery } from './graphql/__generated__/graphql.ts';
import {
  type CharacterFromQuery,
  isValid,
} from './graphql/helpers/birthdayCharacters.ts';

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
    <>
      <h1>{currentDate.toLocaleDateString()}</h1>
      <h2>Herzlichen Glückwunsch!</h2>
      {characters.map((character) => {
        const mediaNodes = character.media?.nodes ?? [];
        const origin = mediaNodes.map(
          (node) => node?.title?.romaji ?? 'Unbekannt'
        );

        return (
          <div
            key={character.id}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 5,
            }}
          >
            <div>
              <h2>{character.name?.full ?? 'Unbekannt'}</h2>
              <p>
                <b>Alter:</b> {character.age ?? 'Unbekannt'}
              </p>
              <p>
                <b>Geschlecht:</b> {character.gender ?? 'Unbekannt'}
              </p>
              <p>
                <b>Herkunft:</b> {origin.join(', ')}
              </p>
            </div>
            {character.image?.large && (
              <img
                src={character.image.large}
                alt={`Image of ${character.name?.full ?? 'an unknown character'}`}
                width={160}
              />
            )}
          </div>
        );
      })}
    </>
  );
}

export default App;
