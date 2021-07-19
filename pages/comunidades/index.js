import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../../src/components/MainGrid'
import { ProfileSidebar } from '../index'
import { EditedRelationshipBoxWrapper } from '../../src/components/Relationship'
import { AlurakutMenu } from '../../src/lib/AlurakutCommons'

export default function Page(props) {
    const githubUser = props.githubUser
    const [communities, setCommunities] = React.useState([])
    React.useEffect(function () {
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
    }, [])

    return (
        <>
            <AlurakutMenu githubUser={githubUser} />

            <MainGrid>
                <div className="profileArea" style={{ gridArea: 'profileArea' }}>
                    <ProfileSidebar githubUser={githubUser} />
                </div>
                <div style={{ gridArea: 'welcomeArea, relationshipArea' }}>
                    <EditedRelationshipBoxWrapper style={{ height: '80vh' }}>
                        <h2 className="smallTitle">Comunidades ({communities.length})</h2>

                        <ul>
                            {communities.map((communities) => {
                                return (
                                    <li key={communities.id}>
                                        <a href={`${communities.contentUrl}`}>
                                            <img src={`${communities.imageUrl}`} />
                                            <span>{communities.title}</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>

                    </EditedRelationshipBoxWrapper>
                </div>
            </MainGrid>
        </>
    )
}

export async function getServerSideProps(context) {
    const cookies = nookies.get(context)
    const token = cookies.USER_TOKEN
    const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
        headers: {
            Authorization: token
        }
    })
        .then((response) => response.json())

    if (!isAuthenticated) {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    const { githubUser } = jwt.decode(token);
    return {
        props: {
            githubUser
        }
    }
}