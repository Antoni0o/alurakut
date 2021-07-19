import React from 'react';
import { useRouter } from "next/dist/client/router";
import Link from 'next/link';
import MainGrid from "../../src/components/MainGrid";
import Box from "../../src/components/Box";
import { ProfileSidebar } from '../index';
import { RelationshipBoxWrapper } from '../../src/components/Relationship'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../../src/lib/AlurakutCommons';


function RelationshipBox(props) {
    const limitedRelationships = props.items.slice(0, 6)
    return (
        <RelationshipBoxWrapper>
            <h2 className="smallTitle">{props.title} ({props.items.length})</h2>

            <ul>
                {limitedRelationships.map((user) => {
                    return (
                        <li key={user.id}>
                            <Link href={`/usuario/${user.login}`}>
                                <a>
                                    <img src={`https://github.com/${user.login}.png`} />
                                    <span>{user.login}</span>
                                </a>
                            </Link>
                        </li>
                    )
                })}
            </ul>

        </RelationshipBoxWrapper >
    )
}

function CommunitiesBox(props) {
    const limitedCommunities = props.items.slice(0, 6)

    return (
        <RelationshipBoxWrapper>
            <h2 className="smallTitle">{props.title} ({props.items.length})</h2>

            <ul>
                {limitedCommunities.map((community) => {
                    return (
                        <li key={community.id}>
                            <a href={`${community.contentUrl}`}>
                                <img src={`${community.imageUrl}`} />
                                <span>{community.title}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>


        </RelationshipBoxWrapper>
    )
}

export default function Page() {

    const router = useRouter()
    const { otherGithubUser } = router.query

    const githubUser = otherGithubUser
    console.log(otherGithubUser)

    const [communities, setCommunities] = React.useState([])
    const [following, setFollowing] = React.useState([])
    const [followers, setFollowers] = React.useState([])
    React.useEffect(function () {
        fetch(`https://api.github.com/users/${githubUser}/followers`)
            .then(async (serverResponse) => {
                return await serverResponse.json()
            })
            .then((completeResponse) => {
                setFollowers(completeResponse)
            })

        fetch(`https://api.github.com/users/${githubUser}/following`)
            .then(async (serverResponse) => {
                return await serverResponse.json()
            })
            .then((completeResponse) => {
                setFollowing(completeResponse)
            })

        fetch('https://graphql.datocms.com/', {
            method: 'POST',
            headers: {
                'Authorization': 'f90d78b4c44432694c56f693306af0',
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                "query": `query {
            allCommunities {
              id
              title
              imageUrl
              contentUrl
              creatorSlug
            }
          }`})
        })
            .then((response) => response.json())
            .then((completeResponse) => {
                const datoCommunities = completeResponse.data.allCommunities;
                setCommunities(datoCommunities)
            })
    }, [githubUser])

    return (
        <>
            <AlurakutMenu githubUser={githubUser} />

            <MainGrid>

                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>

                <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
                    <Box >
                        <h1 className="title">{`${githubUser}`}</h1>

                        <OrkutNostalgicIconSet />
                    </Box>

                </div>

                <div className="relationshipArea" style={{ gridArea: 'relationshipArea' }}>

                    <CommunitiesBox title="Comunidades" items={communities} />

                    <RelationshipBox title="Seguidores" items={followers} />

                    <RelationshipBox title="Seguindo" items={following} />

                </div >

            </MainGrid >
        </>
    )
}