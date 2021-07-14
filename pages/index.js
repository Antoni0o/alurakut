import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { RelationshipBoxWrapper } from '../src/components/Relationship'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'


function ProfileSidebar(props) {
  return (
    <Box >
      <img src={`https://www.github.com/${props.githubUser}.png`} style={{ borderRadius: '.8rem' }} alt="foto de perfil" />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'Antoni0o'
  const favoritePeople = [
    'omariosouto',
    'juunegreiros',
    'peas',
    'rafaballerini',
    'filipedeschamps',
    'lucasmontano'
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box >
            <h1 className="title">Bem-vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="relationshipArea" style={{ gridArea: 'relationshipArea' }}>
          <RelationshipBoxWrapper>
            <h2 className="SmallTitle">Pessoas da Comunidade</h2>

            <ul>
              {favoritePeople.map((githubUser) => {
                return (
                  <li>
                    <a href={`/users/${githubUser}`} key={githubUser}>
                      <img src={`https://github.com/${githubUser}.png`} />
                      <span>{githubUser}</span>
                    </a>
                  </li>
                )
              })}
            </ul>

          </RelationshipBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
